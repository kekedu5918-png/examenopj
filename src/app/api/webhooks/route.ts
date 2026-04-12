import Stripe from 'stripe';

import { upsertUserSubscription } from '@/features/account/controllers/upsert-user-subscription';
import { upsertPrice } from '@/features/pricing/controllers/upsert-price';
import { upsertProduct } from '@/features/pricing/controllers/upsert-product';
import { getStripeAdmin } from '@/libs/stripe/stripe-admin';
import { claimStripeWebhookEvent, releaseStripeWebhookEvent } from '@/libs/stripe/stripe-webhook-idempotency';

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_failed',
]);

function logWebhook(stage: string, eventId: string, type: string, extra?: string) {
  console.info(`[stripe webhook] ${stage} id=${eventId} type=${type}${extra ? ` ${extra}` : ''}`);
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      return Response.json(
        { error: 'Stripe webhook: en-tête stripe-signature ou STRIPE_WEBHOOK_SECRET manquant' },
        { status: 400 },
      );
    }
    event = getStripeAdmin().webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    return Response.json(`Webhook Error: ${(error as Error).message}`, { status: 400 });
  }

  if (!relevantEvents.has(event.type)) {
    return Response.json({ received: true, ignored: true });
  }

  const { alreadyClaimed } = await claimStripeWebhookEvent(event.id);
  if (alreadyClaimed) {
    logWebhook('duplicate_skip', event.id, event.type);
    return Response.json({ received: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case 'product.created':
      case 'product.updated':
        await upsertProduct(event.data.object as Stripe.Product);
        break;
      case 'price.created':
      case 'price.updated':
        await upsertPrice(event.data.object as Stripe.Price);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await upsertUserSubscription({
          subscriptionId: subscription.id,
          customerId: subscription.customer as string,
          isCreateAction: false,
        });
        break;
      }
      case 'checkout.session.completed': {
        const checkoutSession = event.data.object as Stripe.Checkout.Session;

        if (checkoutSession.mode === 'subscription') {
          const subscriptionId = checkoutSession.subscription;
          await upsertUserSubscription({
            subscriptionId: subscriptionId as string,
            customerId: checkoutSession.customer as string,
            isCreateAction: true,
          });
        }
        break;
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subRef = invoice.subscription;
        const subscriptionId = typeof subRef === 'string' ? subRef : subRef?.id;
        const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id;
        if (subscriptionId && customerId) {
          await upsertUserSubscription({
            subscriptionId,
            customerId,
            isCreateAction: false,
          });
          logWebhook('payment_failed_sync', event.id, event.type, `subscription=${subscriptionId}`);
        } else {
          logWebhook('payment_failed_skip', event.id, event.type, 'no subscription on invoice');
        }
        break;
      }
      default:
        throw new Error('Unhandled relevant event!');
    }
  } catch (error) {
    console.error('[stripe webhook] handler error', event.id, event.type, error);
    await releaseStripeWebhookEvent(event.id);
    return Response.json('Webhook handler failed. View your nextjs function logs.', {
      status: 400,
    });
  }

  logWebhook('ok', event.id, event.type);
  return Response.json({ received: true });
}

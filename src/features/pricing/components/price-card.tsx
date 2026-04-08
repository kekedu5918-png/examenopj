'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { IoCheckmark } from 'react-icons/io5';

import { SexyBoarder } from '@/components/sexy-boarder';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  PriceCardVariant,
  productMetadataSchema,
  stripeMetadataToStringRecord,
  variantHighlightLabel,
} from '../models/product-metadata';
import { BillingInterval, Price, ProductWithPrices } from '../types';

export function PricingCard({
  product,
  price,
  createCheckoutAction,
}: {
  product: ProductWithPrices;
  price?: Price;
  createCheckoutAction?: ({ price }: { price: Price }) => void;
}) {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>(
    price ? (price.interval as BillingInterval) : 'month'
  );

  // Determine the price to render
  const currentPrice = useMemo(() => {
    // If price is passed in we use that one. This is used on the account page when showing the user their current subscription.
    if (price) return price;

    // If no price provided we need to find the right one to render for the product.
    // First check if the product has a price (ex. pack examen sans prix en ligne → contact).
    // We'll return null and handle that case when rendering.
    if (product.prices.length === 0) return null;

    // Next determine if the product is a one time purchase - in these cases it will only have a single price.
    if (product.prices.length === 1) return product.prices[0];

    // Lastly we can assume the product is a subscription one with a month and year price, so we get the price according to the select billingInterval
    return product.prices.find((price) => price.interval === billingInterval);
  }, [billingInterval, price, product.prices]);

  const monthPrice = product.prices.find((price) => price.interval === 'month')?.unit_amount;
  const yearPrice = product.prices.find((price) => price.interval === 'year')?.unit_amount;
  const isBillingIntervalYearly = billingInterval === 'year';

  const rawRecord = stripeMetadataToStringRecord(product.metadata);
  const parsedMeta = rawRecord
    ? productMetadataSchema.safeParse({
        price_card_variant: rawRecord.price_card_variant,
        ...(rawRecord.support_level !== undefined && rawRecord.support_level !== ''
          ? { support_level: rawRecord.support_level }
          : {}),
      })
    : null;

  if (!parsedMeta?.success) {
    console.error(
      '[ProductMetadata] Parse failed for:',
      product.id,
      parsedMeta && !parsedMeta.success ? parsedMeta.error.flatten() : 'invalid or missing metadata'
    );
  }

  const metadata = parsedMeta?.success
    ? parsedMeta.data
    : {
        price_card_variant: 'free' as const,
        support_level: 'email' as const,
      };

  /** Styles bouton par variant métadonnées Stripe (free | mensuel | examen). */
  const buttonVariantByTier: Record<PriceCardVariant, 'default' | 'sexy' | 'orange'> = {
    free: 'default',
    mensuel: 'sexy',
    examen: 'orange',
  };

  function handleBillingIntervalChange(billingInterval: BillingInterval) {
    setBillingInterval(billingInterval);
  }

  return (
    <WithSexyBorder variant={metadata.price_card_variant} className='w-full flex-1'>
      <div className='flex w-full flex-col rounded-md border border-zinc-800 bg-black p-4 lg:p-8'>
        <div className='p-4'>
          <div className='mb-1 text-center font-alt text-xl font-bold'>{product.name}</div>
          <div className='flex justify-center gap-0.5 text-zinc-400'>
            <span className='font-semibold'>
              {yearPrice && isBillingIntervalYearly
                ? '$' + yearPrice / 100
                : monthPrice
                ? '$' + monthPrice / 100
                : 'Custom'}
            </span>
            <span>{yearPrice && isBillingIntervalYearly ? '/year' : monthPrice ? '/month' : null}</span>
          </div>
        </div>

        {!Boolean(price) && product.prices.length > 1 && <PricingSwitch onChange={handleBillingIntervalChange} />}

        <div className='m-auto flex w-fit flex-1 flex-col gap-2 px-8 py-4'>
          <CheckItem text={variantHighlightLabel(metadata.price_card_variant)} />
          <CheckItem
            text={
              metadata.support_level === 'live'
                ? 'Support prioritaire (réponse rapide)'
                : 'Support par e-mail'
            }
          />
        </div>

        {createCheckoutAction && (
          <div className='py-4'>
            {currentPrice && (
              <Button
                variant={buttonVariantByTier[metadata.price_card_variant]}
                className='w-full'
                onClick={() => createCheckoutAction({ price: currentPrice })}
              >
                Get Started
              </Button>
            )}
            {!currentPrice && (
              <Button variant={buttonVariantByTier[metadata.price_card_variant]} className='w-full' asChild>
                <Link href='/contact'>Contact Us</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </WithSexyBorder>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className='flex items-center gap-2'>
      <IoCheckmark className='my-auto flex-shrink-0 text-slate-500' />
      <p className='text-sm font-medium text-white first-letter:capitalize'>{text}</p>
    </div>
  );
}

/** Bordure mise en avant pour la carte « mensuel » (plus free / examen sans effet). */
export function WithSexyBorder({
  variant,
  className,
  children,
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant: PriceCardVariant }) {
  if (variant === 'mensuel') {
    return (
      <SexyBoarder className={className} offset={100}>
        {children}
      </SexyBoarder>
    );
  } else {
    return <div className={className}>{children}</div>;
  }
}

function PricingSwitch({ onChange }: { onChange: (value: BillingInterval) => void }) {
  return (
    <Tabs
      defaultValue='month'
      className='flex items-center'
      onValueChange={(newBillingInterval) => onChange(newBillingInterval as BillingInterval)}
    >
      <TabsList className='m-auto'>
        <TabsTrigger value='month'>Mensuel</TabsTrigger>
        <TabsTrigger value='year'>Annuel</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

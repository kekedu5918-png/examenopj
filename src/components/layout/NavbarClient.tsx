'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, Zap } from 'lucide-react';

import { navigation } from '@/app/navigation';
import { AccountMenu } from '@/components/account-menu';
import { TrialReminderBanner } from '@/components/layout/TrialReminderBanner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ActionResponse } from '@/types/action-response';
import { cn } from '@/utils/cn';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

type TrialReminder = {
  daysLeft: number;
  endsAtIso: string;
};

type NavbarClientProps = {
  isLoggedIn: boolean;
  isPremium: boolean;
  signOut: () => Promise<ActionResponse>;
  trialReminder: TrialReminder | null;
};

export function NavbarClient({ isLoggedIn, isPremium, signOut, trialReminder }: NavbarClientProps) {
  const pathname = usePathname();

  const linkClass = (active: boolean) =>
    cn(
      'relative text-sm font-medium transition-colors',
      active ? 'text-white' : 'text-gray-400 hover:text-white'
    );

  return (
    <div className='sticky top-0 z-50'>
      {trialReminder ? (
        <TrialReminderBanner daysLeft={trialReminder.daysLeft} endsAtIso={trialReminder.endsAtIso} />
      ) : null}
      <motion.header
        className='border-b border-white/10 bg-navy-950/80 backdrop-blur-xl'
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className='mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4'>
          <Link href='/' className='group flex shrink-0 items-baseline gap-1.5'>
            <span className='text-sm font-bold tracking-tight text-white'>EXAMEN</span>
            <span className='text-sm font-bold tracking-tight text-gold-400'>OPJ</span>
            <span className='rounded border border-gold-500/40 bg-gold-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-300'>
              2026
            </span>
          </Link>

          <nav className='hidden items-center gap-1 lg:flex'>
            {navigation.main.map((item) => {
              if ('href' in item) {
                if (item.href === '/pricing' && isPremium) {
                  return null;
                }
                const active = isActive(pathname, item.href);
                const isPremiumLink = item.href === '/pricing';
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative inline-flex items-center gap-1.5 px-3 py-2',
                      isPremiumLink
                        ? cn(
                            'rounded-md text-sm font-semibold transition-colors',
                            active
                              ? 'text-gold-300'
                              : 'text-gold-400/90 hover:text-gold-300'
                          )
                        : linkClass(active)
                    )}
                  >
                    {isPremiumLink ? <Zap className='h-3.5 w-3.5 shrink-0 opacity-90' aria-hidden /> : null}
                    {item.name}
                    {active ? (
                      <span className='absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gold-400' />
                    ) : null}
                  </Link>
                );
              }

              const open = item.children.some((c) => isActive(pathname, c.href));
              return (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger
                    className={cn(
                      'relative flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-gold-400/50',
                      open ? 'text-white' : 'text-gray-400 hover:text-white'
                    )}
                  >
                    {item.name}
                    <ChevronDown className='h-4 w-4 opacity-70' />
                    {open ? (
                      <span className='absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gold-400' />
                    ) : null}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align='start'
                    className='min-w-[280px] border border-white/10 bg-navy-900/95 p-1 text-gray-200 shadow-xl backdrop-blur-xl'
                  >
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.href} asChild className='cursor-pointer focus:bg-white/10'>
                        <Link href={child.href} className='flex flex-col gap-0.5 py-2'>
                          <span className='font-medium text-white'>{child.name}</span>
                          <span className='text-xs text-gray-500'>{child.description}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })}

            {isLoggedIn ? (
              <div className='flex items-center px-2'>
                <AccountMenu signOut={signOut} />
              </div>
            ) : (
              <Link href='/login' className={cn('relative px-3 py-2', linkClass(isActive(pathname, '/login')))}>
                Connexion
                {isActive(pathname, '/login') ? (
                  <span className='absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gold-400' />
                ) : null}
              </Link>
            )}
          </nav>

          <div className='flex items-center gap-2'>
            <Sheet>
              <SheetTrigger className='inline-flex rounded-lg p-2 text-white lg:hidden' aria-label='Menu'>
                <Menu className='h-6 w-6' />
              </SheetTrigger>
              <SheetContent
                side='right'
                className='w-full border-white/10 bg-navy-950/98 backdrop-blur-xl sm:max-w-sm'
              >
                <SheetHeader>
                  <SheetTitle className='text-left text-white'>Menu</SheetTitle>
                </SheetHeader>
                <nav className='mt-6 flex max-h-[calc(100vh-8rem)] flex-col gap-1 overflow-y-auto pb-8'>
                  {navigation.main.map((item) => {
                    if ('href' in item) {
                      if (item.href === '/pricing' && isPremium) {
                        return null;
                      }
                      const active = isActive(pathname, item.href);
                      const isPremiumLink = item.href === '/pricing';
                      return (
                        <SheetClose key={item.href} asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              'flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium',
                              active ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white',
                              isPremiumLink && !active && 'border border-gold-500/30 bg-gold-500/10 text-gold-200',
                              isPremiumLink && active && 'border border-gold-500/40 bg-gold-500/15 text-gold-100'
                            )}
                          >
                            {isPremiumLink ? <Zap className='h-4 w-4 shrink-0 text-gold-400' aria-hidden /> : null}
                            {item.name}
                          </Link>
                        </SheetClose>
                      );
                    }

                    const sectionOpen = item.children.some((c) => isActive(pathname, c.href));
                    return (
                      <Collapsible key={item.name} defaultOpen={sectionOpen} className='group border-b border-white/5 py-1'>
                        <CollapsibleTrigger className='flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold text-white outline-none hover:bg-white/5'>
                          {item.name}
                          <ChevronDown className='h-4 w-4 shrink-0 opacity-70 transition-transform duration-200 group-data-[state=open]:rotate-180' />
                        </CollapsibleTrigger>
                        <CollapsibleContent className='space-y-1 pb-2'>
                          {item.children.map((child) => {
                            const active = isActive(pathname, child.href);
                            return (
                              <SheetClose key={child.href} asChild>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    'block rounded-lg px-3 py-2.5 text-sm',
                                    active ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                  )}
                                >
                                  <span className='block font-medium text-gray-200'>{child.name}</span>
                                  <span className='mt-0.5 block text-xs text-gray-500'>{child.description}</span>
                                </Link>
                              </SheetClose>
                            );
                          })}
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })}

                  {isLoggedIn ? (
                    <div className='mt-2 border-t border-white/10 px-3 py-3'>
                      <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500'>Compte</p>
                      <AccountMenu signOut={signOut} />
                    </div>
                  ) : (
                    <SheetClose asChild>
                      <Link
                        href='/login'
                        className='mt-2 rounded-lg border border-white/10 px-3 py-3 text-center text-sm font-medium text-white'
                      >
                        Connexion
                      </Link>
                    </SheetClose>
                  )}

                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronDown, Menu } from 'lucide-react';

import { navigation } from '@/app/navigation';
import { AccountMenu } from '@/components/account-menu';
import { Button } from '@/components/ui/button';
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

type NavbarClientProps = {
  isLoggedIn: boolean;
  isPremium: boolean;
  signOut: () => Promise<ActionResponse>;
};

export function NavbarClient({ isLoggedIn, isPremium, signOut }: NavbarClientProps) {
  const pathname = usePathname();

  const linkClass = (active: boolean) =>
    cn(
      'relative text-sm font-medium transition-colors',
      active ? 'text-white' : 'text-gray-400 hover:text-white'
    );

  return (
    <motion.header
      className='sticky top-0 z-50 border-b border-white/10 bg-navy-950/80 backdrop-blur-xl'
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
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn('relative px-3 py-2', linkClass(active))}
                >
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
                  className='min-w-[240px] border border-white/10 bg-navy-900/95 p-1 text-gray-200 shadow-xl backdrop-blur-xl'
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
        </nav>

        <div className='flex items-center gap-2'>
          {!isPremium ? (
            <Button
              asChild
              size='sm'
              className='hidden border-gold-500/40 bg-gold-500/15 text-gold-300 hover:bg-gold-500/25 hover:text-gold-200 sm:inline-flex'
            >
              <Link href='/pricing'>Premium ✨</Link>
            </Button>
          ) : null}

          {isLoggedIn ? (
            <AccountMenu signOut={signOut} />
          ) : (
            <>
              <Button
                asChild
                variant='ghost'
                size='sm'
                className='hidden text-gray-300 hover:bg-white/5 hover:text-white lg:inline-flex'
              >
                <Link href='/login'>Connexion</Link>
              </Button>
            </>
          )}

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
              <nav className='mt-8 flex flex-col gap-1'>
                {navigation.main.map((item) => {
                  if ('href' in item) {
                    const active = isActive(pathname, item.href);
                    return (
                      <SheetClose key={item.href} asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            'rounded-lg px-3 py-3 text-sm font-medium',
                            active ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                          )}
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    );
                  }
                  return (
                    <div key={item.name} className='space-y-1 py-2'>
                      <div className='px-3 text-xs font-semibold uppercase tracking-wider text-gray-500'>
                        {item.name}
                      </div>
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
                              {child.name}
                            </Link>
                          </SheetClose>
                        );
                      })}
                    </div>
                  );
                })}
                {!isLoggedIn ? (
                  <SheetClose asChild>
                    <Link
                      href='/login'
                      className='mt-4 rounded-lg border border-white/10 px-3 py-3 text-center text-sm font-medium text-white'
                    >
                      Connexion
                    </Link>
                  </SheetClose>
                ) : null}
                {!isPremium ? (
                  <SheetClose asChild>
                    <Link
                      href='/pricing'
                      className='mt-2 rounded-lg border border-gold-500/40 bg-gold-500/15 px-3 py-3 text-center text-sm font-medium text-gold-300'
                    >
                      Premium ✨
                    </Link>
                  </SheetClose>
                ) : null}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}

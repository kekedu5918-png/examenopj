/** @vitest-environment jsdom */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { act, renderHook } from '@testing-library/react';

describe('useDebouncedValue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('retourne la valeur initiale puis la valeur après le délai', () => {
    const { result, rerender } = renderHook(({ v, d }: { v: string; d: number }) => useDebouncedValue(v, d), {
      initialProps: { v: 'a', d: 150 },
    });
    expect(result.current).toBe('a');

    rerender({ v: 'b', d: 150 });
    expect(result.current).toBe('a');
    act(() => {
      vi.advanceTimersByTime(149);
    });
    expect(result.current).toBe('a');
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('b');
  });
});

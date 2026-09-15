import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';

/** Registra os listeners globais de cursor/touch e prefers-reduced-motion. */
export function usePointerTracking() {
  const setPointer = useAppStore((s) => s.setPointer);
  const setReducedMotion = useAppStore((s) => s.setReducedMotion);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPointer((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };

    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      setPointer(
        (touch.clientX / window.innerWidth) * 2 - 1,
        -((touch.clientY / window.innerHeight) * 2 - 1),
      );
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onMq = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onMq);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      mq.removeEventListener('change', onMq);
    };
  }, [setPointer, setReducedMotion]);
}

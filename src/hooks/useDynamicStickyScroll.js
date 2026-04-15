import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * useDynamicStickyScroll
 *
 * Fixes the sticky-scroll content-clipping bug where sections with
 * position:sticky; top:0; height:100vh clip content taller than the viewport.
 *
 * Strategy:
 *  1. Measure the natural scrollHeight of the inner content wrapper.
 *  2. Set the outer container's minHeight = contentHeight + viewportHeight
 *     so there is enough scroll room for all content + the "next section
 *     slides over" transition window.
 *  3. As the page scrolls past the sticky section, translate the inner
 *     content wrapper upward by the matching amount so all content is
 *     visible through the MAIN scroll (no nested scroll context).
 */
export function useDynamicStickyScroll() {
  const outerRef   = useRef(null); // outer wrapper div (position: relative)
  const contentRef = useRef(null); // inner content div (gets translateY)

  const [contentH, setContentH]       = useState(0);
  const [viewportH, setViewportH]     = useState(() => window.innerHeight);
  const [translateY, setTranslateY]   = useState(0);

  // --- 1. Measure content height on mount + whenever it changes ----
  const measure = useCallback(() => {
    if (contentRef.current) {
      // Use offsetHeight so padding is included but collapsed margins aren't
      // double-counted. Fall back to scrollHeight for overflow content.
      const h = Math.max(
        contentRef.current.scrollHeight,
        contentRef.current.offsetHeight
      );
      setContentH(h);
    }
    setViewportH(window.innerHeight);
  }, []);

  useEffect(() => {
    // Initial measurement — defer one frame so layout is complete
    const id = requestAnimationFrame(measure);

    const ro = new ResizeObserver(measure);
    if (contentRef.current) ro.observe(contentRef.current);
    // Also observe the outer container so we catch layout shifts
    if (outerRef.current) ro.observe(outerRef.current);

    window.addEventListener('resize', measure, { passive: true });

    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  // --- 2. Scroll listener: translate content to reveal excess ------
  useEffect(() => {
    const onScroll = () => {
      if (!outerRef.current) return;
      const vh     = window.innerHeight;
      const excess = Math.max(0, contentH - vh);

      if (excess === 0) {
        setTranslateY(0);
        return;
      }

      // getBoundingClientRect().top is negative once the outer has scrolled
      // past the top of the viewport; its magnitude = pixels scrolled into the section.
      const scrolledInto = Math.max(0, -outerRef.current.getBoundingClientRect().top);
      setTranslateY(-Math.min(scrolledInto, excess));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once immediately so position is correct on mount / content change
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [contentH]);

  // --- 3. Compute outer minHeight reactively -----------------------
  // = contentHeight + 1 viewport (transition window for next section).
  // Both contentH and viewportH are state so this recalculates on resize.
  const outerMinHeight =
    contentH > 0
      ? `${contentH + viewportH}px`
      : '200vh';

  return {
    outerRef,       // attach to the outer position:relative wrapper div
    contentRef,     // attach to the div that wraps ALL renderable content inside the section
    translateY,     // apply as style={{ transform: `translateY(${translateY}px)` }}
    outerMinHeight, // apply as style={{ minHeight: outerMinHeight }}
  };
}

import { useEffect } from "react";

/**
 * useClickOutside
 * @param ref - React ref to the element to detect outside clicks
 * @param handler - function to call when click outside
 */
function useClickOutside(ref: React.RefObject<HTMLDivElement>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    function listener(event: MouseEvent | TouchEvent) {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    }
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;

import { MutableRefObject, useEffect } from "react";

function useWatchOutsideClick(
  ref: MutableRefObject<HTMLElement | null>,
  handler: (e: MouseEvent) => void
): void {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    function handleClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        handler(e);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, handler]);
}

export default useWatchOutsideClick;

import { useEffect } from "react";

// Click outside to close
export const useClickOutside = (
  closestItemSelector: string,
  condition: boolean,
  callback: () => void,
) => {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      e.preventDefault();
      e.stopPropagation();
      if (!(e.target as HTMLElement).closest(closestItemSelector)) {
        callback();
      }
    }

    function preventDragOutside(e: DragEvent) {
      e.preventDefault();
    }

    if (condition) {
      document.addEventListener("click", handleClick);
      document.addEventListener("drag", preventDragOutside);
      document.addEventListener("dragstart", preventDragOutside);
    }

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("drag", preventDragOutside);
      document.removeEventListener("dragstart", preventDragOutside);
    };
  }, [closestItemSelector, condition, callback]);
};

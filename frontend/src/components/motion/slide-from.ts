export function slide(direction: "left" | "right" | "top" | "bottom", delay?: number) {
  const x = direction === "left" ? -100 : direction === "right" ? 100 : 0;
  const y = direction === "top" ? -100 : direction === "bottom" ? 100 : 0;

  return {
    initial: { opacity: 0, x, y },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x, y },
    transition: { duration: 0.2, delay },
  };
}

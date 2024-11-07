import { motion } from "framer-motion";

export function MotionListItem(props: { children: React.ReactNode }) {
  return <motion.li layout>{props.children}</motion.li>;
}

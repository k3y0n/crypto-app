import styles from "./Badge.module.scss";
import { BadgeProps } from "./BadgeProps";

const Badge = ({ value, color }: BadgeProps) => {
  return <span className={`${styles.badge} ${styles[color]}`}>{value}</span>;
};

export default Badge;

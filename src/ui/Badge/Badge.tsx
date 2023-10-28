import React from "react";
import styles from "./Badge.module.scss";
import { BadgeProps } from "./BadgeProps";

const Badge: React.FC<BadgeProps> = ({ value, color }) => {
  return <span className={`${styles.badge} ${styles[color]}`}>{value}</span>;
};

export default Badge;

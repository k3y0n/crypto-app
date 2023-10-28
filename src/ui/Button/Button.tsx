import React from "react";
import styles from "./Button.module.scss";
import { ButtonProps } from "./ButtonProps";

const Button: React.FC<ButtonProps> = ({
	label,
	onClick,
	className,
	children,
	type,
}) => {
	const buttonType = type || "button";

	return (
		<button
			className={`${styles.button} ${styles[className || ""]}`}
			onClick={onClick}
			type={buttonType}
		>
			{children ? children : label}
		</button>
	);
};

export default Button;

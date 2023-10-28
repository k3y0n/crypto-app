import React, { useEffect } from "react";
import Form from "../../components/Form/Form";
import styles from "./Modal.module.scss";
import { ModalProps } from "./ModalProps";

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, coinData }) => {
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (isVisible && onClose && !event.defaultPrevented) {
				const target = event.target as HTMLElement;
				if (!target.closest(`.${styles["modal-content"]}`)) {
					onClose();
				}
			}
		};

		if (isVisible) {
			document.addEventListener("mousedown", handleOutsideClick);
		} else {
			document.removeEventListener("mousedown", handleOutsideClick);
		}

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [isVisible, onClose]);

	return isVisible ? (
		<div className={styles["modal-overlay"]}>
			<div className={styles["modal-content"]}>
				<Form coinData={coinData} />
			</div>
		</div>
	) : null;
};

export default Modal;

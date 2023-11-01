import React, { useEffect } from "react";
import Form from "../../components/Form/Form";
import styles from "./Modal.module.scss";
import { ModalProps } from "./ModalProps";
import PortfolioTable from "../../components/PortfolioTable/PortfolioTable";

const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  coinData,
  selectedComponent,
}) => {
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
        {selectedComponent === "Form" && coinData ? (
          <Form coinData={coinData} />
        ) : (
          <PortfolioTable />
        )}
      </div>
    </div>
  ) : null;
};

export default Modal;

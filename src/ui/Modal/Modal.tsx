import { ModalProps } from "./ModalProps";

const Modal:React.FC<ModalProps> = ({isVisibility}) => {
  return {isVisibility && (<div>Modal</div>)};
};

export default Modal;

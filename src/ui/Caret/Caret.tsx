import { CaretUpFill, CaretDownFill } from "react-bootstrap-icons";

interface CaretProps {
  direction: "asc" | "desc";
}

export const Caret: React.FC<CaretProps> = ({ direction }) => {
  return direction === "asc" ? <CaretUpFill /> : <CaretDownFill />;
};

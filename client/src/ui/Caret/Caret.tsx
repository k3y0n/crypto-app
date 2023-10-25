import { CaretUpFill, CaretDownFill } from "react-bootstrap-icons";

interface CaretProps {
  direction: "asc" | "desc";
  active: boolean;
}
export const Caret: React.FC<CaretProps> = ({ direction, active }) => {
  return active && (direction === "asc" ? <CaretUpFill /> : <CaretDownFill />);
};

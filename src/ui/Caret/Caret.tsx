import { CaretUpFill, CaretDownFill } from "react-bootstrap-icons";

interface CaretProps {
  direction: "asc" | "desc";
}

export const Caret = ({ direction }: CaretProps) => {
  return direction === "asc" ? <CaretUpFill /> : <CaretDownFill />;
};

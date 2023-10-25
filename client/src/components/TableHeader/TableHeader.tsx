import React from "react";
import styles from "./TableHeader.module.css";
import { TableHeaderProps } from "./TableHeaderProps";
import { Caret } from "../../ui/Caret/Caret";

const TableHeader: React.FC<TableHeaderProps> = ({ headers, onSort }) => {
  const handleSort = (key: string) => {
    if (key !== "logo" && key !== "action") {
      onSort(key);
    }
  };
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header.key} onClick={() => handleSort(header.key)}>
            {header.label}
            {header.key !== "logo" && header.key !== "action" ? (
              <Caret />
            ) : null}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

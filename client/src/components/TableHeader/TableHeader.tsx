import React from "react";
import { TableHeaderProps } from "./TableHeaderProps";
import { Caret } from "../../ui/Caret/Caret";

const TableHeader: React.FC<TableHeaderProps> = ({
  headers,
  handleSort,
  sortSettings,
}) => {
  return (
    <thead>
      <tr>
        {headers.map((item) => {
          const isActive = sortSettings.column === item.key;
          const isClickable =
            item.key !== "actions" &&
            item.key !== "symbol" &&
            item.key !== "logo";

          const handleSortClick = () => {
            if (isClickable) {
              handleSort(item.key);
            }
          };

          return (
            <td key={item.key} onClick={handleSortClick}>
              {item.label}
              {isActive && isClickable && (
                <Caret direction={sortSettings.direction} active={true} />
              )}
            </td>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;

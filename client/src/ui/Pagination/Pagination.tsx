import React from "react";
import styles from "./Pagination.module.css";
import { PaginationProps } from "./PaginationProps";



const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className={styles.pagination}>
      {pages.map((page) => (
        <li key={page} className={page === currentPage ? styles.active : ""}>
          <button onClick={() => onPageChange(page)}>{page}</button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;

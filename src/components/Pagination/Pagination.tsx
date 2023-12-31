import styles from "./Pagination.module.scss";
import { PaginationProps } from "./PaginationProps";
import Button from "../Button/Button";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className={styles.pagination}>
      {pages.map((page) => (
        <li key={page} className={page === currentPage ? styles.active : ""}>
          <Button onClick={() => onPageChange(page)} label={page} />
        </li>
      ))}
    </ul>
  );
};

export default Pagination;

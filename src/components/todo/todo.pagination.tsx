import React from "react";
import "./todo.pagination.css";

export const Pagination: React.FC<{
  page: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  totalPages: number;
}> = ({ page, setPage, setPageSize, totalPages }) => {

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setPageSize(Number(e.target.value));
  };

  return (
    <div className="todo_controls--pagination">
      <button
        className="btn-secondary"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}>
        Prev
      </button>
      <p>Page {page} of {totalPages}</p>
      <button
        className="btn-secondary"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}>
        Next
      </button>
      <div className="todo_controls--page">
        <p>per page</p>
        <select onChange={onChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

import styles from "./Paging.module.css";
import Pagination from "react-js-pagination";

function Paging({ page, showNum, maxPage, setPage }) {
  const handlePageChange = (e) => {
    setPage(e);
    window.scrollTo({ left: 0, top: 0 });
  };
  return (
    <div className={styles.paging}>
      <Pagination
        activePage={page}
        itemsCountPerPage={showNum}
        totalItemsCount={maxPage * showNum}
        pageRangeDisplayed={10}
        prevPageText="<"
        nextPageText=">"
        onChange={handlePageChange}
      />
    </div>
  );
}

export default Paging;

import Paging from "./Paging";
import styles from "./Info.module.css";

function Info({ page, showNum, maxPage, categoryName, setSort, setShowNum, setPage }) {
  function sortChange(e) {
    setSort(e.target.value);
  }

  function change10() {
    // 페이지 내 게시글 수 (10개 보여주기로 지정)
    setShowNum(10);
    setPage(page * 2 - 1);
  }

  function change20() {
    // 페이지 내 게시글 수 (10개 보여주기로 지정)
    setShowNum(20);
    setPage(Math.ceil(page / 2));
  }
  return (
    <div className={styles.main}>
      <div className={styles.sortList}>
        <button value={1} onClick={sortChange} className={styles.infoBtn}>
          기본순
        </button>
        <button value={2} onClick={sortChange} className={styles.infoBtn}>
          신작순
        </button>
        <button value={3} onClick={sortChange} className={styles.infoBtn}>
          평점순
        </button>
        <button value={4} onClick={sortChange} className={styles.infoBtn}>
          찜한순
        </button>
      </div>
      <Paging page={page} showNum={showNum} maxPage={maxPage} setPage={setPage} />
      <div>{categoryName}</div>
      <button onClick={change10} className={styles.infoBtn}>
        10
      </button>
      <button onClick={change20} className={styles.infoBtn}>
        20
      </button>
    </div>
  );
}
export default Info;

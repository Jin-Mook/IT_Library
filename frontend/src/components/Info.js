import Paging from "./Paging";
import styles from "./Info.module.css";

function Info({ page, showNum, maxPage, setSort, setShowNum, setPage }) {
  function sortChange(e) {
    setSort(e.target.value);
  }

  function changeNum(e) {
    setShowNum(Number(e.target.value)); // 원래 String형태로 가는데 Paging.js 내부에 있는 <Pagination />에서 number형태를 원하므로 형변환을 해줌
    setPage(1);
  }

  return (
    <div className={styles.main}>
      <div></div>
      <Paging page={page} showNum={showNum} maxPage={maxPage} setPage={setPage} />
      <div className={styles.select}>
        <select onChange={sortChange} defaultValue="default">
          <option value="default">정렬 기준</option>
          <option value={1}>기본순</option>
          <option value={2}>신작순</option>
          <option value={3}>평점순</option>
          <option value={4}>찜한순</option>
        </select>
        <select onChange={changeNum} defaultValue="default">
          <option value="default">게시물 갯수</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
}
export default Info;

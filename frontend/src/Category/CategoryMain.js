import Search from "../components/Search";
import List from "./List";
import styles from "./CategoryMain.module.css";

function CategoryMain() {
  return (
    <div>
      <Search />
      <div className={styles.main}>
        <div className={styles.sortList}>
          <div>기본순</div>
          <div>신작순</div>
          <div>평점순</div>
          <div>찜한순</div>
          <div>도서평순</div>
        </div>
        <div className={styles.pagenation}>pagenation</div>
      </div>
      <List />
    </div>
  );
}

export default CategoryMain;

import Search from "../components/Search";
import styles from "./CategoryMain.module.css";
import Pagenation from "../Pagenation/Pagenation";

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
        <Pagenation />
      </div>
    </div>
  );
}

export default CategoryMain;

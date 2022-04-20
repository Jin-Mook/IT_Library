import styles from "./Main.module.css";
import ShowBook from "./ShowBook";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div>
      <Link to={"/"}>평점 높은 순</Link>
      <div className={styles.main}>
        <ShowBook />
      </div>

      <Link to={"/"}>찜 갯수 높은 순</Link>
      <div className={styles.main}>
        <ShowBook />
      </div>

      <Link to={"/"}>주요 신간</Link>
      <div className={styles.main}>
        <ShowBook />
      </div>
    </div>
  );
}

export default Main;

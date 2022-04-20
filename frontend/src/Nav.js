import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <Link to={"/"}>IT 도서 다모아</Link>
      </div>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link to={"/"}>도서 목록</Link>
        </li>
        <li className={styles.li}>
          <Link to={"/"}>도서 리뷰</Link>
        </li>
        <li className={styles.li}>
          <Link to={"/"}>실시간 채팅</Link>
        </li>
        <li className={styles.li}>
          <Link to={"/"}>로그인</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;

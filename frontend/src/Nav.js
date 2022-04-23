import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
function Nav() {
  const [login, setLogin] = useState(false); // 로그인과 비로그인 시 Nav바에서 표시되는 문자 다르게 출력

  function LoginNav() {
    const onLogin = () => {
      setLogin(true);
    };

    const onLogout = () => {
      setLogin(false);
    };

    return login === false ? (
      <li className={styles.li} onClick={onLogin}>
        <Link to={"/"}>로그인</Link>
      </li>
    ) : (
      <>
        <li className={styles.li}>
          <Link to={"/"}>마이페이지</Link>
        </li>
        <li className={styles.li} onClick={onLogout}>
          <Link to={"/"}>로그아웃</Link>
        </li>
      </>
    );
  }

  <li className={styles.li}>
    <Link to={"/login"}>로그인</Link>
  </li>;

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
        <LoginNav />
      </ul>
    </div>
  );
}

export default Nav;

import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

function Nav({ login }) {
  function LoginNav() {
    const onLogout = () => {
      localStorage.removeItem("nickname");
    };

    return login === false ? (
      <li className={styles.li}>
        <Link to={"/login"}>로그인</Link>
      </li>
    ) : (
      <>
        <li className={styles.li}>
          <Link to={"/"}>{localStorage.getItem("nickname")}</Link>{" "}
          {/* 마이페이지 부분(닉네임처리) */}
        </li>
        <li className={styles.li} onClick={onLogout}>
          <Link to={"/"}>로그아웃</Link>
        </li>
      </>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.text}>
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
    </div>
  );
}

export default Nav;

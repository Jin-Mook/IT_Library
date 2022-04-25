import styles from "./Login.module.css";
import Button from "./Button";
import { Link } from "react-router-dom";

function Login() {
  function onSubmit(e) {
    console.log(e);
    e.preventDefault();
  }

  return (
    <div className={styles.main}>
      <div className={styles.inner}>
        <form onSubmit={onSubmit}>
          <input type="email" className={styles.email} placeholder="이메일"></input>
          <input type="password" className={styles.pwd} placeholder="비밀번호"></input>
          <Button text="로그인"></Button>
        </form>
        <div>
          <p>회원이 아니실 경우</p>
          <Link to={"/signup"}>
            <Button text="회원가입"></Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

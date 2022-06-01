import styles from "./Login.module.css";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Cookies } from "react-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const cookies = new Cookies();
  console.log(cookies);

  async function data() {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      {
        email: email,
        password: pwd,
      },
      { withCredentials: true }
    );
    const result = response;
    console.log(result);
  }

  // async function dataTest() {
  //   const response = await axios.get("http://localhost:8000/api/auth/test", {
  //     withCredentials: true,
  //   });
  //   const result = response;
  //   console.log(result);
  // }

  function onSubmit(e) {
    console.log(e);
    e.preventDefault();
  }

  function EmailChange(e) {
    setEmail(e.target.value);
  }

  function PwdChange(e) {
    setPwd(e.target.value);
  }

  return (
    <div className={styles.main}>
      <div className={styles.inner}>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className={styles.email}
            placeholder="이메일"
            onChange={EmailChange}
          ></input>
          <input
            type="password"
            className={styles.pwd}
            placeholder="비밀번호"
            onChange={PwdChange}
          ></input>
          <Button text="로그인" onClick={data}></Button>
        </form>
        <div>
          <p>회원이 아니실 경우</p>
          <Link to={"/signup"}>
            <Button text="회원가입"></Button>
          </Link>
        </div>
        {/* <button onClick={dataTest}>test</button> */}
      </div>
    </div>
  );
}

export default Login;

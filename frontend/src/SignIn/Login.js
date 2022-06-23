import styles from "./Login.module.css";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();

  async function data() {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      {
        email: email,
        password: pwd,
      },
      { withCredentials: true }
    );
    const result = response.data;
    console.log(result.userInfo);

    if (result.success) {
      // 로그인 성패 여부에 따른 결과
      localStorage.setItem("nickname", result.userInfo.nickname);
      JSON.stringify(localStorage.setItem("login", true));
      dispatch({ type: "LOGIN", nickname: result.userInfo.nickname });
      window.location.replace("/");
    } else {
      alert("이메일 혹은 패스워드를 확인하십시오.");
    }
  }

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
            type="text"
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
        {/* <button onClick={console.log(localStorage)}>test</button> */}
      </div>
    </div>
  );
}

export default Login;

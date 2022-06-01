import { useState } from "react";
import axios from "axios";
import styles from "./Email.module.css";
import Timer from "./Timer";

function Email({ setEmail }) {
  // 이메일 유효성 검사 함수

  const [checkEmail, setCheckEmail] = useState("");
  const [emailCss, setEmailCss] = useState(styles.hidden);
  const [code, setCode] = useState("");
  const [codeCss, setCodeCss] = useState(styles.hidden);
  const [auth, setAuth] = useState(false);
  const [timerStart, setTimerStart] = useState(false);

  async function data(e) {
    if (auth) {
      const response = await axios.get(
        `http://localhost:8000/api/auth/check?email=${checkEmail}`
      );
      const result = response.data;
      setCode(result.code);
      console.log(result.code);
      setAuth(result.success);

      if (result.success) {
        setCodeCss(styles.show);
        setTimerStart(true);
      } else setEmailCss(styles.show);
      // success가 true일 때 인증번호 입력 창 표시
      // false일 시 중복된 이메일 이라는 표시 출력
    }
  }

  function onChange(e) {
    setCheckEmail(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  var reg_email = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  // 이메일 유효성 검사 코드

  function checkE(e) {
    if (!reg_email.test(e.target.value)) {
      return setEmailCss(styles.show), setAuth(false); // 이메일 형식이 아닐 때
    } else {
      return setEmailCss(styles.hidden), setAuth(true); // 올바른 이메일 형식일 때
    }
  }

  function checkAuth(e) {
    if (e.target.previousElementSibling.value === code) {
      setEmail(checkEmail);
      alert("확인되었습니다.");
    } else {
      alert("인증번호가 일치하지 않습니다.");
    }
  }

  function ShowTimer() {
    if (timerStart === true) {
      return (
        <div>
          <Timer />
        </div>
      );
    } else {
      return <div>false</div>;
    }
  }

  return (
    <form onSubmit={onSubmit} className={styles.main}>
      <div className={styles.email}>
        {/* 이메일 */}
        <input
          type="text"
          className={styles.email_text}
          placeholder="이메일을 입력해주세요"
          onChange={onChange}
          onBlur={checkE}
        ></input>
        <button className={styles.email_btn} onClick={data}>
          이메일 인증
        </button>
      </div>
      <div className={codeCss}>
        <div className={styles.auth}>
          {/* 인증번호 */}
          <input
            type="text"
            className={styles.auth_text}
            placeholder="인증번호를 입력해주세요"
          ></input>
          <button className={styles.auth_btn} onClick={checkAuth}>
            인증번호 확인
          </button>
          {<ShowTimer />}
        </div>
      </div>
      <div className={emailCss}>{"이메일 형식에 맞추어 입력해주세요."}</div>
    </form>
  );
}
export default Email;

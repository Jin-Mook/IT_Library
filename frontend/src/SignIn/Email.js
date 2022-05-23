import { useState } from "react";
import axios from "axios";
import styles from "./Email.module.css";

function Email({ setEmail }) {
  // 이메일 유효성 검사 함수
  const [checkEmail, setCheckEmail] = useState("");
  const [emailCss, setEmailCss] = useState(styles.hidden);

  async function data(e) {
    setCheckEmail(e.target.previousElementSibling.value);
    const response = await axios.get(
      `http://localhost:8000/api/auth/check?email=${checkEmail}`
    );
    const result = response.data;
    console.log(result.code);
    result.success ? setEmail(checkEmail) : setEmailCss(styles.show);
  }

  function onChange(e) {
    setCheckEmail(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
  }
  var reg_email = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  function checkE(e) {
    if (!reg_email.test(e.target.value)) {
      return setEmailCss(styles.show); // 이메일 형식이 아닐 때
    } else {
      return setEmailCss(styles.hidden), setInterval(); // 올바른 이메일 형식일 때
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.email}>
        {/* 이메일 */}
        <input
          type="email"
          className={styles.email_text}
          placeholder="이메일을 입력해주세요"
          value={checkEmail}
          onChange={onChange}
          onBlur={checkE}
        ></input>
        <button className={styles.email_btn} onClick={data}>
          이메일 인증
        </button>
        <div className={emailCss}>{"이메일 형식에 맞추어 입력해주세요."}</div>
      </div>
    </form>
  );
}
export default Email;

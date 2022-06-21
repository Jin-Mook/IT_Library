import { useState } from "react";
import axios from "axios";
import styles from "./NickName.module.css";

function NickName({ setNickName, setNickNameSuccess }) {
  const [checkNickName, setCheckNickName] = useState("");
  const [successCss, setSuccessCss] = useState(styles.hidden);
  const [falseCss, setFalseCss] = useState(styles.hidden);

  async function data(e) {
    setCheckNickName(e.target.previousElementSibling.value);
    const response = await axios.get(
      `http://localhost:8000/api/auth/check?nickname=${checkNickName}`
    );
    const result = response.data;
    if (result.success) {
      setNickName(checkNickName);
      setFalseCss(styles.hidden);
      setSuccessCss(styles.success);
      setNickNameSuccess(true);
    } else {
      setSuccessCss(styles.hidden);
      setFalseCss(styles.show);
    }
  }

  function onChange(e) {
    setCheckNickName(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.nickname}>
        {/* 닉네임 */}
        <input
          type="text"
          className={styles.nickname_text}
          placeholder="닉네임을 입력해 주세요"
          value={checkNickName}
          onChange={onChange}
        ></input>
        <button className={styles.nickname_btn} onClick={data}>
          중복확인
        </button>
        <div className={successCss}>{"사용 가능한 닉네임 입니다."}</div>
        <div className={falseCss}>{"이미 사용중인 닉네임 입니다."}</div>
      </div>
    </form>
  );
}

export default NickName;

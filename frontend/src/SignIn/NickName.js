import { useState } from "react";
import axios from "axios";
import styles from "./NickName.module.css";

function NickName({ setNickName }) {
  const [checkNickName, setCheckNickName] = useState("");
  const [nickNameCss, setNickNameCss] = useState(styles.hidden);

  async function data(e) {
    setCheckNickName(e.target.previousElementSibling.value);
    const response = await axios.get(
      `http://localhost:8000/api/auth/check?nickname=${checkNickName}`
    );
    const result = response.data;
    console.log(result.success);
    result.success ? setNickName(checkNickName) : setNickNameCss(styles.show);
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
        <div className={nickNameCss}>{"이미 사용중인 닉네임 입니다."}</div>
      </div>
    </form>
  );
}

export default NickName;

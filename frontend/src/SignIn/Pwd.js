import { useState } from "react";
import styles from "./Pwd.module.css";

function Pwd({ setPwd, setPwdSuccess }) {
  // const [checkPwd, setCheckPwd] = useState();
  const [pwdCss, setPwdCss] = useState(styles.hidden);
  const [pwdCheckCss, setPwdCheckCss] = useState(styles.hidden);

  function CheckPwd(e) {
    // 패스워드 유효성 검사 함수
    var reg = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{10,16}$/; // 비밀번호에 문자, 숫자, 특수문자가 각각 최소 1개 이상, 10자리에서 최대 16자리까지 허용
    if (!reg.test(e.target.value)) {
      return setPwdCss(styles.show); // 비밀번호가 조건에 맞지 않을 때
    } else {
      return setPwdCss(styles.hidden); // 조건에 맞을 때
    }
  }

  function CheckPwdSame(e) {
    // 패스워드 일치 유효성 검사 함수
    if (e.target.value !== e.target.previousSibling.previousSibling.value) {
      return setPwdCheckCss(styles.show), setPwdSuccess(true); // 비밀번호 확인과 비밀번호가 일치할 때
    } else {
      return setPwdCheckCss(styles.hidden), setPwd(e.target.value); // 비밀번호 확인과 비밀번호가 같을 때
    }
  }

  return (
    <div className={styles.pwd}>
      <input
        /* 패스워드 */
        type="password"
        className={styles.pwd_text}
        placeholder="비밀번호"
        onBlur={CheckPwd} // onBlur: 포커스가 아웃될 때 <=> onFocus
      ></input>
      <div className={pwdCss}>
        {"특수문자, 영문자, 숫자를 포함하여 10자 이상 입력해주세요."}
      </div>
      <input
        /* 패스워드 확인 */
        type="password"
        className={styles.pwd_text}
        placeholder="비밀번호 확인"
        onBlur={CheckPwdSame} // onBlur: 포커스가 아웃될 때 <=> onFocus
      ></input>
      <div className={pwdCheckCss}>{"비밀번호가 다릅니다."}</div>
    </div>
  );
}

export default Pwd;

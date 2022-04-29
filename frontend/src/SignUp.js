import { useState } from "react";
import styles from "./SignUp.module.css";

function SignUp() {
  const [emailCss, setEmailCss] = useState(styles.hidden);
  const [pwdCss, setPwdCss] = useState(styles.hidden);
  const [pwdCheckCss, setPwdCheckCss] = useState(styles.hidden);

  function onSubmit(e) {
    console.log(e);
    e.preventDefault();
  }

  function CheckEmail(email) {
    // 이메일 유효성 검사 함수
    var reg_email = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!reg_email.test(email.target.value)) {
      return setEmailCss(styles.show); // 이메일 형식이 아닐 때
    } else {
      return setEmailCss(styles.hidden); // 올바른 이메일 형식일 때
    }
  }

  function CheckPwd(pwd) {
    var reg = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;
    if (!reg.test(pwd.target.value)) {
      return setPwdCss(styles.show); // 비밀번호가 조건에 맞지 않을 때
    } else {
      return setPwdCss(styles.hidden); // 조건에 맞을 때
    }
  }

  function CheckPwdSame(reg) {
    if (reg.target.value !== reg.target.previousSibling.previousSibling.value) {
      return setPwdCheckCss(styles.show); // 비밀번호 확인과 비밀번호가 일치할 때
    } else {
      return setPwdCheckCss(styles.hidden); // 비밀번호 확인과 비밀번호가 다를 때
    }
  }

  return (
    <form onSubmit={onSubmit} className={styles.main}>
      <div className={styles.nickname}>
        <input
          type="text"
          className={styles.nickname_text}
          placeholder="닉네임을 입력해 주세요"
        ></input>
        <button className={styles.nickname_btn}>중복확인</button>
        <div className={styles.hidden}>{"이미 사용중인 닉네임 입니다."}</div>
      </div>
      <div className={styles.email}>
        <input
          type="email"
          className={styles.email_text}
          placeholder="이메일을 입력해주세요"
          onBlur={CheckEmail} // onBlur: 포커스가 아웃될 때 <=> onFocus
        ></input>
        <button className={styles.email_btn}>이메일 인증</button>
        <div className={emailCss}>{"이메일 형식에 맞추어 입력해주세요."}</div>
      </div>
      <div className={styles.pwd}>
        <input
          type="password"
          className={styles.pwd_text}
          placeholder="비밀번호"
          onBlur={CheckPwd} // onBlur: 포커스가 아웃될 때 <=> onFocus
        ></input>
        <div className={pwdCss}>
          {"특수문자, 영문자, 숫자를 포함하여 10자 이상 입력해주세요."}
        </div>
        <input
          type="password"
          className={styles.pwd_text}
          placeholder="비밀번호 확인"
          onBlur={CheckPwdSame} // onBlur: 포커스가 아웃될 때 <=> onFocus
        ></input>
        <div className={pwdCheckCss}>{"비밀번호가 다릅니다."}</div>
      </div>
      <button className={styles.btn}>회원가입</button>
    </form>
  );
}

export default SignUp;

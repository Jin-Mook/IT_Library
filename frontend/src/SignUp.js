import styles from "./SignUp.module.css";

function SignUp() {
  function onSubmit(e) {
    console.log(e);
    e.preventDefault();
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
        ></input>
        <button className={styles.email_btn}>이메일 인증</button>
        <div className={styles.hidden}>{"이메일 형식에 맞추어 입력해주세요."}</div>
      </div>
      <div className={styles.pwd}>
        <input type="password" className={styles.pwd_text} placeholder="비밀번호"></input>
        <div className={styles.hidden}>
          {"특수문자, 영문자, 숫자를 포함하여 10자 이상 입력해주세요."}
        </div>
        <input
          type="password"
          className={styles.pwd_text}
          placeholder="비밀번호 확인"
        ></input>
        <div className={styles.hidden}>{"비밀번호가 다릅니다."}</div>
      </div>
      <button className={styles.btn}>회원가입</button>
    </form>
  );
}

export default SignUp;

import styles from "./SignUp.module.css";
import Button from "./Button";

function SignUp() {
  function onSubmit(e) {
    console.log(e);
    e.preventDefault();
  }

  return (
    <div className={styles.main}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className={styles.pwd}
          placeholder="닉네임을 입력해 주세요"
        ></input>
        <Button text={"중복확인"} />
        <input
          type="email"
          className={styles.email}
          placeholder="이메일을 입력해주세요"
        ></input>
        <input type="password" className={styles.pwd} placeholder="비밀번호"></input>
        <input type="password" className={styles.pwd} placeholder="비밀번호 확인"></input>
        <Button text={"회원가입"} />
      </form>
    </div>
  );
}

export default SignUp;

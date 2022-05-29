import { useState } from "react";
import styles from "./SignUp.module.css";
import NickName from "./NickName";
import Email from "./Email";
import Pwd from "./Pwd";
import Button from "../components/Button";

function SignUp() {
  const [nickName, setNickName] = useState();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState();

  return (
    <div className={styles.main}>
      <NickName setNickName={setNickName} />
      <Email setEmail={setEmail} />
      <Pwd setPwd={setPwd} />
      {/* <div>
        {nickName} {email} {pwd}
      </div> */}
      <Button text={"회원가입"} />
    </div>
  );
}

export default SignUp;

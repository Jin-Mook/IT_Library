import { useState } from "react";
import styles from "./SignUp.module.css";
import NickName from "./NickName";
import Email from "./Email";
import Pwd from "./Pwd";
import Button from "../components/Button";
import axios from "axios";

function SignUp() {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  async function data() {
    const response = axios.post("http://localhost:8000/api/auth/register", {
      nickname: nickName,
      email: email,
      password: pwd,
    });
    const result = response;
    console.log(result);
  }

  return (
    <div className={styles.main}>
      <NickName setNickName={setNickName} />
      <Email setEmail={setEmail} />
      <Pwd setPwd={setPwd} />
      {/* <div>
        {nickName} {email} {pwd}
      </div> */}
      <Button text={"회원가입"} onClick={data} />
    </div>
  );
}

export default SignUp;

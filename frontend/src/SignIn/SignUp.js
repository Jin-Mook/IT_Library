import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [nickNameSuccess, setNickNameSuccess] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState(false);
  let navigate = useNavigate();

  async function data() {
    if (nickNameSuccess && emailSuccess && pwdSuccess) {
      const response = axios.post("http://localhost:8000/api/auth/register", {
        nickname: nickName,
        email: email,
        password: pwd,
      });
      const result = response;
      console.log(result.data);
      alert("회원가입 완료");
      navigate("/login");
    } else {
      alert("입력된 정보를 다시한번 확인하세요.");
    }
  }

  return (
    <div className={styles.main}>
      <NickName setNickName={setNickName} setNickNameSuccess={setNickNameSuccess} />
      <Email setEmail={setEmail} setEmailSuccess={setEmailSuccess} />
      <Pwd setPwd={setPwd} setPwdSuccess={setPwdSuccess} />
      <Button text={"회원가입"} onClick={data} />
    </div>
  );
}

export default SignUp;

import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

function Cookie() {
  const [cookies, setCookie, removeCookie] = useCookies(["key"]);
  const [text, setText] = useState("");

  useEffect(() => {
    getCookieFunc();
  }, []);

  const setCookieFunc = () => {
    let random = Math.floor(Math.random() * (10 - 0) + 0);
    setCookie("key", random, { maxAge: 2000 });

    let result = "setCookie : " + random;
    setText(result);
  };

  const getCookieFunc = (param) => {
    let result = "getCookie : " + cookies.rememberNumber;
    setText(result);
  };

  const removeCookieFunc = () => {
    removeCookie("key");

    setText("removeCookie");
  };

  return (
    <div>
      <button onClick={setCookieFunc}>set cookie</button>
      <button onClick={getCookieFunc}>get cookie</button>
      <button onClick={removeCookieFunc}>remove cookie</button>

      <p>{text}</p>
    </div>
  );
}
export default Cookie;

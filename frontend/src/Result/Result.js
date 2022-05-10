import { Link, useLocation } from "react-router-dom";
import styles from "./Result.module.css";

function Result() {
  // 결과창
  let location = useLocation(); //location 객체를 location 변수에 저장
  const search = location.state.search; // location으로 데이터에 접근해서 받아온다!

  return (
    <div className={styles.main}>
      <h1>{`'${search}'의 검색결과`}</h1>
      <Link to={"/"}>Main Page</Link>
    </div>
  );
}

export default Result;

// /search?title=제목&view=한페이지 책 갯수

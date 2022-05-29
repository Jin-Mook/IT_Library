import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Search from "../components/Search";
import axios from "axios";
import Paging from "../components/Paging";
import Info from "../components/Info";
import ShowList from "../components/ShowList";
import styles from "./Result.module.css";

function Result() {
  // 결과창
  let location = useLocation(); //location 객체를 location 변수에 저장
  const searchResult = location.state.search; // location으로 데이터에 접근해서 받아온다!

  const [allBooks, setAllBooks] = useState([]); // 전체 책 목록
  const [page, setPage] = useState(1);
  const [showNum, setShowNum] = useState(10);
  const [maxPage, setMaxPage] = useState();
  const [sort, setSort] = useState(1);

  async function data() {
    const response = await axios.get(
      `http://localhost:8000/api/mainPage/search?title=${searchResult}&page=${page}&view=${showNum}` /* sort부분은 아직 구현이 안되어있음 &sortMethod=${sort} */
    );
    const result = await response.data;
    setAllBooks(result.books);
    setMaxPage(result.maxPage);
  }

  useEffect(() => {
    // 값이 변할 때 마다 리렌더링
    data();
  }, [showNum, page, sort]);

  return (
    <div className={styles.main}>
      <Search value={searchResult} />
      <Info
        page={page}
        showNum={showNum}
        maxPage={maxPage}
        categoryName={searchResult}
        setSort={setSort}
        setShowNum={setShowNum}
        setPage={setPage}
      />
      <div className={styles.title}>{searchResult} 의 검색결과</div>
      {allBooks.map((value) => (
        <ShowList value={value} key={value.id} />
      ))}
      <Paging page={page} showNum={showNum} maxPage={maxPage} setPage={setPage} />
    </div>
  );
}

export default Result;

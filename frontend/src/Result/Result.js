import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Search from "../components/Search";
import styles from "./Result.module.css";
import axios from "axios";
import Paging from "../components/Paging";
import Info from "../components/Info";
import ShowList from "../components/ShowList";

function Result() {
  // 결과창
  let location = useLocation(); //location 객체를 location 변수에 저장
  const searchResult = location.state.search; // location으로 데이터에 접근해서 받아온다!

  const [allBooks, setAllBooks] = useState([]); // 전체 책 목록
  const [page, setPage] = useState(1);
  const [showNum, setShowNum] = useState(10);
  const [maxPage, setMaxPage] = useState();

  async function data() {
    const response = await axios.get(
      `http://localhost:8000/api/mainPage/search?title=${searchResult}&view=${showNum}&page=${page}`
    );
    const result = await response.data;
    setAllBooks(result.books);
    setMaxPage(result.maxPage);
  }

  useEffect(() => {
    // 값이 변할 때 마다 리렌더링
    data();
  }, [showNum, page]);

  return (
    <div>
      <div>
        <Search value={searchResult} />
        <Info
          page={page}
          showNum={showNum}
          maxPage={maxPage}
          setShowNum={setShowNum}
          setPage={setPage}
        />
      </div>
      {`'${searchResult}'의 검색결과`}
      <div className={styles.main}>
        {allBooks.map((value) => (
          <ShowList value={value} page={page} showNum={showNum} key={value.id} />
        ))}
      </div>
      <Paging page={page} showNum={showNum} maxPage={maxPage} setPage={setPage} />
    </div>
  );
}

export default Result;

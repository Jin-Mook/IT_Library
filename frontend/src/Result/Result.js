import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Search from "../components/Search";
import styles from "./Result.module.css";
import axios from "axios";

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

  function handleLeftBtn() {
    if (page === 1) {
      console.log("First Page");
    } else {
      setPage(page - 1);
    }
  }

  function handleRightBtn() {
    if (page === maxPage) {
      console.log("Last Page");
    } else {
      setPage(page + 1);
    }
  }

  function change10() {
    // 페이지 내 게시글 수 (10개 보여주기로 지정)
    setShowNum(10);
  }

  function change20() {
    // 페이지 내 게시글 수 (10개 보여주기로 지정)
    setShowNum(20);
  }

  function ShowList(value) {
    return (
      <div className={styles.list}>
        <img
          className={styles.img}
          src={value.book_image}
          alt="book_image"
          key={value.id}
        ></img>
        <div className={styles.explain}>
          <div>{value.book_title}</div>
          <div>{value.book_writer}</div>
          <div>{value.id}</div>
        </div>
        <div className={styles.btn_div}>
          <button className={styles.btn}>상세보기</button>
          <button className={styles.btn}>찜하기</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Search value={searchResult} />
        <ul className={styles.page}>
          <span className={styles.prev} onClick={handleLeftBtn}>
            {"<"}
          </span>
          {/* <PagenationBtn /> */}
          <span className={styles.next} onClick={handleRightBtn}>
            {">"}
          </span>
        </ul>
        {`page(${page}/${maxPage})`}
        <button onClick={change10}>10</button>
        <button onClick={change20}>20</button>
      </div>
      {`'${searchResult}'의 검색결과`}
      <div className={styles.main}>
        {allBooks.map((value) => (
          <div key={value.id}>{ShowList(value)}</div> // map함수에선 결과값 최상단에 key값을 부여해야 함.
        ))}
      </div>
    </div>
  );
}

export default Result;

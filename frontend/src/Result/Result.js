import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Result.module.css";
import axios from "axios";

function Result() {
  // 결과창
  let location = useLocation(); //location 객체를 location 변수에 저장
  const search = location.state.search; // location으로 데이터에 접근해서 받아온다!

  const [allBooks, setAllBooks] = useState([]); // 전체 책 목록
  const [showBooks, setShowBooks] = useState([]); // 화면에 표시될 책 목록
  const [index, setIndex] = useState(0);
  const [pagenationNum, setPagenationNum] = useState(10);
  // const [pageNum, setPageNum] = useState([]); // 총 페이지 수를 배열에 하나하나 저장
  // const [pageArr, setPageArr] = useState([]); // 페이지네이션 출력 페이지

  async function data() {
    const response = await axios.get(
      `http://localhost:8000/api/mainPage/search?title=${search}&view=${pagenationNum}&page=1`
    );
    const result = await response.data;
    setAllBooks(result);
    setShowBooks(result.books.slice(0, pagenationNum)); // 한 페이지에 0~4 총 5개의 책 표시
  }

  useEffect(() => {
    // 값이 변할 때 마다 리렌더링
    data();
  }, [pagenationNum]);

  function handleLeftBtn() {
    if (index === 0) {
      setShowBooks(allBooks.slice(30));
      setIndex(30);
    } else {
      setShowBooks(allBooks.slice(index - pagenationNum, index));
      setIndex(index - pagenationNum);
    }
  }

  function handleRightBtn() {
    if (index === 30) {
      setShowBooks(allBooks.slice(0, pagenationNum));
      setIndex(0);
    } else {
      setShowBooks(allBooks.slice(index + pagenationNum, index + pagenationNum * 2));
      setIndex(index + pagenationNum);
    }
  }

  function change10() {
    // 페이지 내 게시글 수 (10개 보여주기로 지정)
    setPagenationNum(10);
    setShowBooks(allBooks.slice(0, pagenationNum)); // 한 페이지에 0~4 총 5개의 책 표시
    console.log("10");
  }

  function change20() {
    // 페이지 내 게시글 수 (10개 보여주기로 지정)
    setPagenationNum(20);
    setShowBooks(allBooks.slice(0, pagenationNum)); // 한 페이지에 0~4 총 5개의 책 표시
    console.log("20");
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
          {/* <div>{value.author}</div> */}
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
        <ul className={styles.page}>
          <span className={styles.prev} onClick={handleLeftBtn}>
            {"<"}
          </span>
          {/* <PagenationBtn /> */}
          <span className={styles.next} onClick={handleRightBtn}>
            {">"}
          </span>
        </ul>
      </div>

      {`page(${index / pagenationNum + 1}/4)`}
      <button onClick={change10}>10</button>
      <button onClick={change20}>20</button>
      <div className={styles.main}>
        {showBooks.map((value) => (
          <div key={value.id}>{ShowList(value)}</div> // map함수에선 결과값 최상단에 key값을 부여해야 함.
        ))}
      </div>
    </div>
  );
}

export default Result;

// /search?title=제목&view=한페이지 책 갯수

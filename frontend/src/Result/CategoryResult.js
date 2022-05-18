import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CategorySearch from "../components/CategorySearch";
import styles from "./CategoryResult.module.css";
import axios from "axios";
import Paging from "../components/Paging";
import Info from "../components/Info";

function CategoryResult() {
  // 결과창
  let location = useLocation(); //location 객체를 location 변수에 저장
  const searchResult = location.state.search; // location으로 데이터에 접근해서 받아온다!
  const categoryId = location.state.categoryId; // location으로 데이터에 접근해서 받아온다!
  const categoryName = location.state.categoryName; // location으로 데이터에 접근해서 받아온다!

  const [allBooks, setAllBooks] = useState([]); // 전체 책 목록
  const [page, setPage] = useState(1);
  const [showNum, setShowNum] = useState(10);
  const [maxPage, setMaxPage] = useState();
  const [sort, setSort] = useState(1);

  async function data() {
    const response = await axios.get(
      `http://localhost:8000/api/category/${categoryId}?title=${searchResult}&sortMethod=${sort}&page=${page}&view=${showNum}`
    );
    const result = await response.data;
    setAllBooks(result.books);
    setMaxPage(result.maxPage);
  }

  useEffect(() => {
    // 값이 변할 때 마다 리렌더링
    data();
  }, [showNum, page, sort]);

  function ShowList(value, index) {
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
          <div>{(page - 1) * showNum + (index + 1)}</div>
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
        <CategorySearch categoryId={categoryId} />
        <Info
          page={page}
          showNum={showNum}
          maxPage={maxPage}
          categoryName={categoryName}
          setSort={setSort}
          setShowNum={setShowNum}
          setPage={setPage}
        />
      </div>
      <div className={styles.main}>
        {allBooks.map((value, index) => (
          <div key={value.id}>{ShowList(value, index)}</div> // map함수에선 결과값 최상단에 key값을 부여해야 함.
        ))}
      </div>
      <Paging page={page} showNum={showNum} maxPage={maxPage} setPage={setPage} />
    </div>
  );
}

export default CategoryResult;

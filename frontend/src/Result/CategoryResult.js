import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CategorySearch from "../components/CategorySearch";
import styles from "./CategoryResult.module.css";
import axios from "axios";
import Pagination from "react-js-pagination";

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

  const Paging = () => {
    return (
      <Pagination
        activePage={page}
        itemsCountPerPage={showNum}
        totalItemsCount={maxPage * showNum}
        pageRangeDisplayed={10}
        prevPageText="<"
        nextPageText=">"
        onChange={handlePageChange}
      />
    );
  };

  const handlePageChange = (e) => {
    setPage(e);
    window.scrollTo({ left: 0, top: 0 });
  };

  function change10() {
    // 페이지 내 게시글 수 (10개 보여주기로 지정)
    setShowNum(10);
    setPage(page * 2 - 1);
  }

  function change20() {
    // 페이지 내 게시글 수 (10개 보여주기로 지정)
    setShowNum(20);
    setPage(Math.ceil(page / 2));
  }

  function sortChange(e) {
    setSort(e.target.value);
  }

  function Info() {
    return (
      <div className={styles.main}>
        <div className={styles.sortList}>
          <button value={1} onClick={sortChange} className={styles.infoBtn}>
            기본순
          </button>
          <button value={2} onClick={sortChange} className={styles.infoBtn}>
            신작순
          </button>
          <button value={3} onClick={sortChange} className={styles.infoBtn}>
            평점순
          </button>
          <button value={4} onClick={sortChange} className={styles.infoBtn}>
            찜한순
          </button>
        </div>
        <div className={styles.paging}>
          <Paging />
        </div>
        <div> {categoryName} 카테고리 내의 검색결과입니다.</div>

        <button onClick={change10} className={styles.infoBtn}>
          10
        </button>
        <button onClick={change20} className={styles.infoBtn}>
          20
        </button>
      </div>
    );
  }

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
        <Info />
      </div>
      <div className={styles.main}>
        {allBooks.map((value, index) => (
          <div key={value.id}>{ShowList(value, index)}</div> // map함수에선 결과값 최상단에 key값을 부여해야 함.
        ))}
      </div>
      <div className={styles.paging}>
        <Paging />
      </div>
    </div>
  );
}

export default CategoryResult;

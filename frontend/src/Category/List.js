import { useState, useEffect } from "react";
import styles from "./List.module.css";

function List() {
  //   const [allBooks, setAllBooks] = useState([]); // 전체 책 목록
  const [showBooks, setShowBooks] = useState([]); //화면에 표시될 책 목록
  //   const [index, setIndex] = useState(0);

  async function data() {
    const response = await fetch("http://localhost:3000/data/data(rating).json");
    const result = await response.json();
    // setAllBooks(result.data);
    setShowBooks(result.data.slice(0, 5));
  }

  useEffect(() => {
    // 한번만 렌더링 되게 해주는 것?
    // 생각보다 중요하네 알아보자
    data();
  }, []);

  function ShowList(value) {
    return (
      <div className={styles.list}>
        <img
          className={styles.img}
          src={value.coverimg}
          alt="coverImg"
          key={value.key}
        ></img>
        <div className={styles.explain}>
          <div>{value.title}</div>
          <div>{value.author}</div>
          <div>{value.key}</div>
        </div>
        <div className={styles.btn_div}>
          <button className={styles.btn}>상세보기</button>
          <button className={styles.btn}>찜하기</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      {showBooks.map((value) => (
        <div key={value.key}>{ShowList(value)}</div> // map함수에선 결과값 최상단에 key값을 부여해야 함.
      ))}
    </div>
  );
}

export default List;

// 전체 리스트 중에서(40개) 5개씩 8페이지를 만들어서 하는 것. 40개의 목록을 5개씩 slice해서 페이지에 보여주는 방식으로 진행해보자.

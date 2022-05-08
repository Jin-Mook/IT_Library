import styles from "./Pagenation.module.css";
import { useState, useEffect } from "react";

function Pagenation() {
  const [allBooks, setAllBooks] = useState([]); // 전체 책 목록
  const [showBooks, setShowBooks] = useState([]); //화면에 표시될 책 목록
  const [index, setIndex] = useState(0);

  async function data() {
    const response = await fetch("http://localhost:3000/data/data(rating).json");
    const result = await response.json();
    setAllBooks(result.data);
    setShowBooks(result.data.slice(0, 5)); // 한 페이지에 0~4 총 5개의 책 표시
  }

  useEffect(() => {
    // 한번만 렌더링 되게 해주는 것?
    // 생각보다 중요하네 알아보자
    data();
  }, []);

  function handleLeftBtn() {
    if (index === 0) {
      setShowBooks(allBooks.slice(35));
      setIndex(35);
    } else {
      setShowBooks(allBooks.slice(index - 5, index));
      setIndex(index - 5);
    }
  }

  function handleRightBtn() {
    if (index === 35) {
      setShowBooks(allBooks.slice(0, 5));
      setIndex(0);
    } else {
      setShowBooks(allBooks.slice(index + 5, index + 10));
      setIndex(index + 5);
    }
  }

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
    <div>
      <div>
        <ul className={styles.page}>
          <span className={styles.prev} onClick={handleLeftBtn}>
            {"<"}
          </span>
          <li className={styles.index}>1</li>
          <li className={styles.index}>2</li>
          <li className={styles.index}>3</li>
          <li className={styles.index}>4</li>
          <li className={styles.index}>5</li>
          <li className={styles.index}>6</li>
          <li className={styles.index}>7</li>
          <li className={styles.index}>8</li>
          <li className={styles.index}>9</li>
          <li className={styles.index}>10</li>
          <span className={styles.next} onClick={handleRightBtn}>
            {">"}
          </span>
        </ul>
      </div>
      <div className={styles.main}>
        {showBooks.map((value) => (
          <div key={value.key}>{ShowList(value)}</div> // map함수에선 결과값 최상단에 key값을 부여해야 함.
        ))}
      </div>
    </div>
  );
}
export default Pagenation;

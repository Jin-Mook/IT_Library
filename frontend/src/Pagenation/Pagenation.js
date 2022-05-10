import styles from "./Pagenation.module.css";
import { useState, useEffect } from "react";

function Pagenation() {
  const [allBooks, setAllBooks] = useState([]); // 전체 책 목록
  const [showBooks, setShowBooks] = useState([]); //화면에 표시될 책 목록
  const [index, setIndex] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const [pagenationNum, setPagenationNum] = useState(10);

  async function data() {
    const response = await fetch("http://localhost:3000/data/data(rating).json");
    const result = await response.json();
    setAllBooks(result.data);
    setTotalLength(result.data.length);
    setShowBooks(result.data.slice(0, pagenationNum)); // 한 페이지에 0~4 총 5개의 책 표시
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
    setPagenationNum(10);
    setShowBooks(allBooks.slice(0, pagenationNum)); // 한 페이지에 0~4 총 5개의 책 표시
    console.log("10");
  }

  function change20() {
    setPagenationNum(20);
    setShowBooks(allBooks.slice(0, pagenationNum)); // 한 페이지에 0~4 총 5개의 책 표시
    console.log("20");
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

  function pageNum() {
    const num = totalLength / 5; // num = 8(40개일 때)
    for (var i = 1; i <= num; i++) {
      console.log(i);
      // setPagenationNum([...pagenationNum, i]);
    }
    return console.log(pagenationNum);
  }

  return (
    <div>
      <div>
        <ul className={styles.page}>
          <span className={styles.prev} onClick={handleLeftBtn}>
            {"<"}
          </span>
          <button onClick={pageNum} />
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
          <div key={value.key}>{ShowList(value)}</div> // map함수에선 결과값 최상단에 key값을 부여해야 함.
        ))}
      </div>
    </div>
  );
}
export default Pagenation;

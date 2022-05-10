import Img from "./Img";
import styles from "./ShowBook.module.css";
import { useState, useEffect } from "react";

function ShowBook({ text }) {
  const [allBooks, setAllBooks] = useState([]); // 전체 책 목록
  const [showBooks, setShowBooks] = useState([]); //화면에 표시될 책 목록
  const [index, setIndex] = useState(0);

  async function data() {
    const response = await fetch("http://localhost:3000/data/data(rating).json");
    const result = await response.json();
    setAllBooks(result.data);
    setShowBooks(result.data.slice(0, 5));
  }

  function handleLeftBtn() {
    if (index === 0) {
      setShowBooks(allBooks.slice(35));
      setIndex(35);
    } else {
      setShowBooks(allBooks.slice(index - 1, index + 4));
      setIndex(index - 1);
    }
  }

  function handleRightBtn() {
    if (index === 35) {
      setShowBooks(allBooks.slice(0, 5));
      setIndex(0);
    } else {
      setShowBooks(allBooks.slice(index + 1, index + 6));
      setIndex(index + 1);
    }
  }

  useEffect(() => {
    data();
  }, []);

  return (
    <div className={styles.main}>
      <div>{text}</div>
      <button className={styles.leftBtn} onClick={handleLeftBtn}>
        {"<"}
      </button>
      <button className={styles.rightBtn} onClick={handleRightBtn}>
        {">"}
      </button>
      <div className={styles.img}>
        {showBooks.map((value) => (
          <Img
            key={value.key}
            author={value.author}
            title={value.title}
            coverImg={value.coverimg}
            id={value.key}
          />
        ))}
      </div>
      {`page(${index / 4 + 1}/10)`}
    </div>
  );
}

export default ShowBook;

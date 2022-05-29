import Img from "./Img";
import styles from "./ShowBook.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ShowBook({ text, value }) {
  const [allBooks, setAllBooks] = useState([]); // 전체 책 목록
  const [showBooks, setShowBooks] = useState([]); //화면에 표시될 책 목록
  const [index, setIndex] = useState(0);

  async function data() {
    const response = await axios.get("http://localhost:8000/api/mainPage/all");
    const result = await response.data;
    setAllBooks(result[value]);
    setShowBooks(result[value].slice(0, 5)); // 첫 화면에 보여질 부분 선택
  }

  function handleLeftBtn() {
    // 왼쪽 버튼을 눌렀을 때 하나 씩 넘어가게 구현
    if (index === 0) {
      setShowBooks(allBooks.slice(5));
      setIndex(5);
    } else {
      setShowBooks(allBooks.slice(index - 1, index + 4));
      setIndex(index - 1);
    }
  }

  function handleRightBtn() {
    // 오른쪽 버튼을 눌렀을 때 하나 씩 넘어가게 구현
    if (index === 5) {
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
          <Link to={`/detail/${value.id}`} state={{ bookId: value.id }} key={value.id}>
            <Img
              key={value.id}
              author={value.author}
              title={value.book_title}
              coverImg={value.book_image}
              id={value.key}
            />
          </Link>
        ))}
      </div>
      {`page(${index + 1}/6)`}
    </div>
  );
}

export default ShowBook;

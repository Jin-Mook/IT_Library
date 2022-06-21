import Img from "./Img";
import styles from "./ShowBook.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ShowBook({ text, value }) {
  const [allBooks, setAllBooks] = useState([]); // 전체 책 목록
  const [showBooks, setShowBooks] = useState([]);
  const [index, setIndex] = useState(0);

  async function data() {
    const response = await axios.get("http://localhost:8000/api/mainPage/all");
    const result = response.data;
    setAllBooks(result[value]);
    setShowBooks(result[value][index]);
  }

  useEffect(() => {
    data();
  }, [index]);

  function handleLeftBtn() {
    // 왼쪽 버튼을 눌렀을 때 하나 씩 넘어가게 구현
    if (index === 0) {
      setIndex(5);
    } else {
      setIndex(index - 1);
    }
  }

  function handleRightBtn() {
    // 오른쪽 버튼을 눌렀을 때 하나 씩 넘어가게 구현
    if (index === 9) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  const transHtml = () => {
    const codes = showBooks.book_info;
    return (
      <div className={styles.bookInfo} dangerouslySetInnerHTML={{ __html: codes }}></div>
    );
  };

  return (
    <div className={styles.main_a}>
      <div>{text}</div>
      <div className={styles.main_b}>
        <button className={styles.a} onClick={handleLeftBtn}>
          {/* 왼쪽 버튼 */}
          {"<"}
        </button>
        <div className={styles.b}>
          <Link to={`/detail/${showBooks.id}`} state={{ bookId: showBooks.id }}>
            <img src={showBooks.book_image} className={styles.b_1}></img> {/* 사진 */}
          </Link>
          <div className={styles.b_2}>
            <div className={styles.b_2_1}>
              {/* 제목 저자 출판사 */}
              <Link to={`/detail/${showBooks.id}`} state={{ bookId: showBooks.id }}>
                <div className={styles.title}>{showBooks.book_title}</div>
              </Link>
              <div>
                {showBooks.book_writer} | {showBooks.book_publisher}
              </div>
              <div>
                ⭐️ {showBooks.book_rating} 👍 {showBooks.book_like_count}
              </div>
            </div>
            <div className={styles.b_2_2}>{transHtml()}</div> {/* 내용 */}
            <div className={styles.b_2_3}>
              {/* 표지 슬라이더 */}
              {allBooks.map((value) => (
                <Link
                  to={`/detail/${value.id}`}
                  state={{ bookId: value.id }}
                  key={value.id}
                >
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
          </div>
        </div>
        <button className={styles.c} onClick={handleRightBtn}>
          {/* 오른쪽 버튼 */}
          {">"}
        </button>
      </div>
    </div>
  );
}

export default ShowBook;

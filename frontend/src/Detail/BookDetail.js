import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./BookDetail.module.css";
import BookComment from "./BookComment";

function BookDetail() {
  const [detail, setDetail] = useState([]);
  const [comments, setComments] = useState([]);

  let location = useLocation(); //location 객체를 location 변수에 저장
  const bookId = location.state.bookId;

  async function data() {
    const response = await axios.get(`http://localhost:8000/api/bookinfo/${bookId}`);
    const result = await response.data;
    setDetail(result.book);
    setComments(result.bookComments);
  }

  useEffect(() => {
    data();
  }, []); // string 형태를 html로 변환해야됌

  const transHtml = () => {
    const codes = detail.book_info;
    return (
      <div className={styles.bookInfo} dangerouslySetInnerHTML={{ __html: codes }}></div>
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.bookMain}>
        {" "}
        {/* 1 */}
        <img src={detail.book_image} className={styles.img} /> {/* 1-1 */}
        <div className={styles.title}>
          {/* 1-2 */}
          <div className={styles.a}>
            <div className={styles.book_title}>{detail.book_title}</div>
            <div className={styles.book_writer}>{detail.book_writer}</div>
            <div className={styles.book_publisher}>{detail.book_publisher}</div>
            <div className={styles.book_publish_date}>{detail.book_publish_date}</div>
          </div>
        </div>
      </div>
      {transHtml()}
      {/* 2 */}
      <div className={styles.comments}>
        <BookComment />
      </div>
      {/* 3 */}
    </div>
  );
}

export default BookDetail;

// https://publizm.github.io/posts/react/htmlRendering (transHtml 함수에서 dangerouslySetInnerHTML 사용 시 보안의 취약점에 대해 작성해놓음. cross-site scripting(XSS) 공격을 대비해야 할 것이다.)

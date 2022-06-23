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
    // 값이 변할 때 마다 리렌더링
    data();
  }, [comments]);

  async function likeData() {
    const response = await axios.get(`http://localhost:8000/api/mainPage/like/${bookId}`);
    const result = response.data;
    console.log(result);
  }

  const transHtml = () => {
    const codes = detail.book_info;
    return (
      <div className={styles.bookInfo} dangerouslySetInnerHTML={{ __html: codes }}></div>
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.bookMain}>
        <img src={detail.book_image} className={styles.img} alt="Thumbnail" />
        <div className={styles.title}>
          <div className={styles.info}>
            <div className={styles.book_title}>{detail.book_title}</div>
            <div className={styles.book_writer}>{detail.book_writer}</div>
            <div className={styles.book_publisher}>{detail.book_publisher}</div>
            <div className={styles.book_publish_date}>{detail.book_publish_date}</div>
          </div>
          <div className={styles.like}>
            <button onClick={likeData}>좋아요</button>
          </div>
        </div>
      </div>
      {transHtml()}
      <div>
        <BookComment bookId={bookId} comments={comments} />
      </div>
    </div>
  );
}

export default BookDetail;

// https://publizm.github.io/posts/react/htmlRendering (transHtml 함수에서 dangerouslySetInnerHTML 사용 시 보안의 취약점에 대해 작성해놓음. cross-site scripting(XSS) 공격을 대비해야 할 것이다.)

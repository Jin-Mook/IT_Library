import styles from "./BookComment.module.css";
import axios from "axios";
import { useState } from "react";

function BookComment({ bookId, comments }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const onChangeTitle = (e) => {
    // 검색 창에 입력된 글자를 받아오는 함수
    setTitle(e.target.value);
  };
  const onChangeText = (e) => {
    // 검색 창에 입력된 글자를 받아오는 함수
    setText(e.target.value);
  };
  async function data(e) {
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:8000/api/bookinfo/${bookId}/comment`,
      { commentTitle: title, commentText: text, bookRating: 0 },
      { withCredentials: true }
    );
    const result = response.data;
    setTitle(""); // 댓글작성 버튼 클릭 후 제목필드 초기화
    setText(""); // 댓글작성 버튼 클릭 후 내용필드 초기화
    console.log(result);
  }

  let showComments = comments.map((value) => (
    <div className={styles.comments}>
      <hr></hr>
      <div>작성자 : {value.user_id}</div>
      <div>제목 : {value.comment_title}</div>
      <div>내용 : {value.comment_context}</div>
      <hr></hr>
    </div>
  ));

  return (
    <div className={styles.main}>
      <form className={styles.writeComment}>
        <input
          type="text"
          value={title}
          placeholder="제목"
          className={styles.title}
          onChange={onChangeTitle}
        ></input>
        <input
          type="text"
          value={text}
          placeholder="댓글입력"
          className={styles.text}
          onChange={onChangeText}
        ></input>
        <button onClick={data} className={styles.button}>
          댓글 작성
        </button>
      </form>
      <div className={styles.commentsMain}>{showComments}</div>
    </div>
  );
}

export default BookComment;

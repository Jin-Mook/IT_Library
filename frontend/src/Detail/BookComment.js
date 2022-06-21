import axios from "axios";
import { useState } from "react";

function BookComment() {
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
  async function data() {
    console.log(title);
    console.log(text);
    const response = await axios.post(
      `http://localhost:8000/api/bookinfo/1/comment`,
      { commentTitle: title, commentText: text, bookRating: 0 },
      { withCredentials: true }
    );
    const result = response.data;
    console.log(result);
  }
  return (
    <div>
      <input
        type="text"
        value={title}
        placeholder="제목을 입력하세요."
        onChange={onChangeTitle}
      ></input>
      <input
        type="text"
        value={text}
        placeholder="제목을 입력하세요."
        onChange={onChangeText}
      ></input>
      <button onClick={data}>댓글 작성</button>
    </div>
  );
}

export default BookComment;

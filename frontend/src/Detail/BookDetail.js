import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function BookDetail() {
  const [detail, setDetail] = useState([]);

  let location = useLocation(); //location 객체를 location 변수에 저장
  const bookId = location.state.bookId;

  async function data() {
    const response = await axios.get(`http://localhost:8000/api/bookinfo/${bookId}`);
    const result = await response.data;
    setDetail(result.book);
  }

  useEffect(() => {
    data();
  }, []);

  return (
    <div>
      {detail.book_title}
      <img src={detail.book_image} />
      {detail.book_writer}
      {detail.book_publisher}
      {detail.book_publish_date}
      {detail.book_info}
    </div>
  );
}

export default BookDetail;

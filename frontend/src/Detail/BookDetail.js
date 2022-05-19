import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function BookDetail() {
  const [book, setBook] = useState();

  let location = useLocation(); //location 객체를 location 변수에 저장
  const id = location.state.id;

  async function data() {
    const response = await axios.get(`http://localhost:8000/api/bookinfo/${id}`);
    const result = await response.book;
    setBook(result);
  }

  useEffect(() => {
    data();
  }, []);

  return <h1>{book}</h1>;
}

export default BookDetail;

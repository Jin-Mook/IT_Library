import axios from "axios";
import { useEffect } from "react";

function BookDetail({ bookId }) {
  async function data() {
    const response = await axios.get(`http://localhost:8000/api/bookinfo/${bookId}`);
    const result = await response.book;
    console.log(result);
  }

  useEffect(() => {
    data();
  }, []);

  return;
}

export default BookDetail;

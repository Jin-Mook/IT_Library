import Img from "./Img";
import styles from "./ShowBook.module.css";
import { useState, useEffect } from "react";

function Show_book({ text }) {
  const [books, setBooks] = useState([]);

  async function data() {
    const response = await fetch("http://localhost:3000/data/data.json");
    const result = await response.json();
    setBooks(result.data);
  }
  useEffect(() => {
    data();
  }, []);
  return (
    <div className={styles.main}>
      <div>{text}</div>
      <button className={styles.leftBtn}>{"<"}</button>
      <button className={styles.rightBtn}>{">"}</button>
      <div className={styles.img}>
        {books.map((value) => (
          <>
            <Img author={value.author} title={value.title} coverImg={value.coverimg} />
            {console.log(value)}
          </>
        ))}
      </div>
    </div>
  );
}

export default Show_book;

import styles from "./ShowList.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function ShowList({ id, page, showNum, value, index }) {
  // const [id, setId] = useState();
  // setId(value.id);
  return (
    <div className={styles.list}>
      <img
        className={styles.img}
        src={value.book_image}
        alt="book_image"
        key={value.id}
      ></img>
      <div className={styles.explain}>
        <div>{value.book_title}</div>
        <div>{value.book_writer}</div>
        <div>{value.id}</div>
        <div>{(page - 1) * showNum + (index + 1)}</div>
      </div>
      <div className={styles.btn_div}>
        <Link to={`/detail?id=${id}`}>
          <button className={styles.btn}>상세보기</button>
        </Link>
        <button className={styles.btn}>찜하기</button>
      </div>
    </div>
  );
}
export default ShowList;

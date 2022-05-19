import styles from "./ShowList.module.css";
import { Link } from "react-router-dom";

function ShowList({ value }) {
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
      </div>
      <div className={styles.btn_div}>
        <Link to={`/detail/${value.id}`} state={{ bookId: value.id }}>
          <button className={styles.btn}>상세보기</button>
        </Link>
        <button className={styles.btn}>찜하기</button>
      </div>
    </div>
  );
}
export default ShowList;

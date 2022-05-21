import styles from "./ShowList.module.css";
import { Link } from "react-router-dom";

function ShowList({ value }) {
  return (
    <div className={styles.list}>
      <Link to={`/detail/${value.id}`} state={{ bookId: value.id }}>
        <img
          className={styles.img}
          src={value.book_image}
          alt="book_image"
          key={value.id}
        ></img>
      </Link>
      <div className={styles.explain}>
        <Link to={`/detail/${value.id}`} state={{ bookId: value.id }}>
          <div>{value.book_title}</div>
        </Link>
        <div>
          {value.book_writer} 저 | {value.book_publisher}(출판사가 나와야 함)
        </div>
        <div>출판일 {value.book_publish_date}</div>
        <button className={styles.btn}>찜하기</button>
      </div>
    </div>
  );
}
export default ShowList;

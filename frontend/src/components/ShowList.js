import styles from "./ShowList.module.css";

function ShowList({ page, showNum, value, index }) {
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
        <button className={styles.btn} onClick={console.log(value.id)}>
          상세보기
        </button>
        <button className={styles.btn}>찜하기</button>
      </div>
    </div>
  );
}
export default ShowList;

import Img from "./Img";
import styles from "./ShowBook.module.css";

function Show_book({ text }) {
  return (
    <div className={styles.main}>
      <div>{text}</div>
      <button className={styles.leftBtn}>{"<"}</button>
      <button className={styles.rightBtn}>{">"}</button>
      <div className={styles.img}>
        <Img />
        <Img />
        <Img />
        <Img />
      </div>
    </div>
  );
}

export default Show_book;

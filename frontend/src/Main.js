import styles from "./Main.module.css";
import ShowBook from "./ShowBook";

function BookList({ text }) {
  return (
    <div className={styles.booklist}>
      <ShowBook text={text} />
    </div>
  );
}

function Main() {
  return (
    <div className={styles.main}>
      <BookList text="평점 높은 순" />
      {/* <BookList text="찜 갯수 높은 순" />
      <BookList text="주요 신간" /> */}
    </div>
  );
}

export default Main;

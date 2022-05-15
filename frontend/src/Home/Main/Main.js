import styles from "./Main.module.css";
import ShowBook from "./ShowBook";

function Main() {
  function BookList({ text, value }) {
    return (
      <div className={styles.booklist}>
        <ShowBook text={text} value={value} />
      </div>
    );
  }
  return (
    <div className={styles.main}>
      <BookList text="평점 높은 순" value="rating" />
      <BookList text="찜 갯수 높은 순" value="likeCount" />
      <BookList text="주요 신간" value="newBook" />
    </div>
  );
}

export default Main;

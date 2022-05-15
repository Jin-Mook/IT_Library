import styles from "./Img.module.css";

function Img({ title, author, id, coverImg }) {
  // 메인화면 책 커버 이미지

  return (
    <div className={styles.flip}>
      <div className={styles.card}>
        <img className={styles.front} src={coverImg} alt="thumbnail"></img>
        <div className={styles.back}>
          <ul className={styles.ul}>
            <li>{title}</li>
            <li>{author}</li>
            <li>{id}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Img;

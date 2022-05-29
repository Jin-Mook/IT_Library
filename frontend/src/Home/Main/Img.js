import styles from "./Img.module.css";

function Img({ title, author, id, coverImg }) {
  // 메인화면 책 커버 이미지

  return <img className={styles.front} src={coverImg} alt="thumbnail"></img>;
}

export default Img;

import styles from "./Button.module.css";

function Button({ onClick, src }) {
  // 버튼
  return (
    <div className={styles.main}>
      <button className={styles.btn} onClick={onClick}>
        <img src={src} className={styles.img} alt="searchImg"></img>
      </button>
    </div>
  );
}

export default Button;

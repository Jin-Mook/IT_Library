import styles from "./Button.module.css";

function Button({ onClick, src, text }) {
  // 버튼
  return (
    <div className={styles.main}>
      <button className={styles.btn} onClick={onClick}>
        {src ? <img src={src} className={styles.img} alt="searchImg"></img> : null}
        {text}
      </button>
    </div>
  );
}

export default Button;

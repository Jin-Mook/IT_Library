import styles from "./Button.module.css";

function Button({ text, onClick, src }) {
  // 버튼

  return (
    <div className={styles.main}>
      <button className={styles.btn} onClick={onClick}>
        <img src={src} className={styles.img}></img>
      </button>
    </div>
  );
}

export default Button;

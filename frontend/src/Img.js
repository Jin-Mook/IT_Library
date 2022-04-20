import styles from "./Img.module.css";

function Img() {
  const onMouseOver = () => {
    console.log("mouse in");
  };
  const onMouseLeave = () => {
    console.log("mouse out");
  };
  return (
    <img
      className={styles.main}
      src="https://upload.wikimedia.org/wikipedia/ko/3/3c/해리_포터와_마법사의_돌_표지.jpg?20160929102754"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      alt="thumbnail"
    ></img>
  );
}

export default Img;

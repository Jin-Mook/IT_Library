import styles from "./Img.module.css";

function Img({ title, author, coverImg }) {
  const onMouseOver = () => {
    // console.log("mouse in");
  };
  const onMouseLeave = () => {
    // console.log("mouse out");
  };
  return (
    <img
      className={styles.main}
      src={coverImg}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      alt="thumbnail"
    ></img>
  );
}

export default Img;

import styles from "./Img.module.css";

function Img({ title, author, id, coverImg }) {
  const onMouseOver = () => {
    // console.log("mouse in");
  };
  const onMouseLeave = () => {
    // console.log("mouse out");
  };
  return (
    <div>
      <img
        className={styles.main}
        src={coverImg}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        alt="thumbnail"
      ></img>
      <div className={styles.detail}>
        <ul className={styles.ul}>
          <li>{title}</li>
          <li>{author}</li>
          <li>{id}</li>
        </ul>
      </div>
    </div>
  );
}

export default Img;

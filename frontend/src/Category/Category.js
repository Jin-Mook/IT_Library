import { Link } from "react-router-dom";
import styles from "./Category.module.css";

function Li({ category }) {
  return (
    <li className={styles.li}>
      <Link to={`/${category}`} state={{ category: category }}>
        {category}
      </Link>
    </li>
  );
}

function Category() {
  return (
    <div className={styles.main}>
      <ul className={styles.ul}>
        <Li category="Categoey1" />
        <Li category="Categoey2" />
        <Li category="Categoey3" />
        <Li category="Categoey4" />
        <Li category="Categoey5" />
      </ul>
      <ul className={styles.ul}>
        <Li category="Categoey6" />
        <Li category="Categoey7" />
        <Li category="Categoey8" />
        <Li category="Categoey9" />
        <Li category="Categoey10" />
      </ul>
      <ul className={styles.ul}>
        <Li category="Categoey11" />
        <Li category="Categoey12" />
        <Li category="Categoey13" />
        <Li />
        <Li />
      </ul>
    </div>
  );
}

export default Category;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Category.module.css";
import axios from "axios";

function Category() {
  const [categories, setCategories] = useState([]);

  async function data() {
    const response = await axios.get(`http://localhost:8000/api/mainPage/all`);
    const result = await response.data;
    setCategories(result.categories);
  }

  useEffect(() => {
    data();
  }, []);

  function Li({ categoryName, id }) {
    return (
      <li className={styles.li}>
        <Link to={`/category?${id}`} state={{ id: id, categoryName: categoryName }}>
          {categoryName}
        </Link>
      </li>
    );
  }
  return (
    <div className={styles.main}>
      <ul className={styles.ul}>
        {categories.map((value) => {
          return <Li id={value.id} key={value.id} categoryName={`${value.category}`} />;
        })}
      </ul>
    </div>
  );
}

export default Category;

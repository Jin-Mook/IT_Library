import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";
import Button from "../../components/Button";

function Search() {
  // 검색창
  const [search, setSearch] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setSearch("");
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <form className={styles.main} onSubmit={onSubmit}>
      <input
        type="text"
        onChange={onChange}
        placeholder="책 제목을 입력해주세요..."
        className={styles.search}
        value={search}
        autoFocus={true}
      />
      <Link to={`/${search}`} state={{ search: search }}>
        {/* state를 사용하여 변수를 결과창으로 전달 */}
        <Button src="images/search.png" />
      </Link>
    </form>
  );
}

export default Search;

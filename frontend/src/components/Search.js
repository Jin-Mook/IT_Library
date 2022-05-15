import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";
import Button from "./Button";

function Search({ value = "" }) {
  // 검색창
  const [search, setSearch] = useState(value);

  const onSubmit = (e) => {
    e.preventDefault(); // 엔터 press 시 자동 submit 막는 기능
    setSearch(""); // submit 시 검색 창 글자 초기화
  };

  const onChange = (e) => {
    // 검색 창에 입력된 글자를 받아오는 함수
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
      <Link to={`/search?title=${search}`} state={{ search: search }}>
        {/* state를 사용하여 변수를 결과창으로 전달 */}
        <Button src="images/search.png" />
      </Link>
    </form>
  );
}

export default Search;

// /search?title=제목&view=한페이지 책 갯수

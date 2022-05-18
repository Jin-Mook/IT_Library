import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CategorySearch.module.css";
import Button from "./Button";

function CategorySearch({ categoryId, categoryName, value = "" }) {
  // 검색창
  const [search, setSearch] = useState(value); // 검색결과 저장
  const [id] = useState(categoryId); // categoryMain에서 보내준 카테고리 아이디 저장
  const [name] = useState(categoryName); // categoryMain에서 보내준 카테고리 아이디 저장

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
      <Link
        to={`/category/search/${categoryId}?title=${search}`}
        state={{ search: search, categoryId: id, categoryName: name }} // 검색결과와 카테고리 아이디 CategoryResult로 전달
      >
        {/* state를 사용하여 변수를 결과창으로 전달 */}
        <Button src="images/search.png" />
      </Link>
    </form>
  );
}

export default CategorySearch;

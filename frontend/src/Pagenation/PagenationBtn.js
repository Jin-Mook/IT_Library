// import { useState, useEffect } from "react";

// function PagenationBtn() {
//   async function data() {
//     const response = await fetch("http://localhost:3000/data/data(rating).json");
//     const result = await response.json();
//     setAllBooks(result.data);
//     setShowBooks(result.data.slice(0, pagenationNum)); // 한 페이지에 0~4 총 5개의 책 표시
//   }

//   useEffect(() => {
//     // 값이 변할 때 마다 리렌더링
//     data();
//   }, []);

//   const [allBooks, setAllBooks] = useState([]); // 전체 책 목록
//   const [pageNum, setPageNum] = useState([]); // 총 페이지 수를 배열에 하나하나 저장
//   const [pageArr, setPageArr] = useState([]); // 페이지네이션 출력 페이지

//   setPageNum(allBooks.map((element, index) => index + 1));
//   for (let i = 0; i < allBooks.length; i += 10) {
//     setPageArr([...pageArr, pageNum.slice(i, i + 10)]);
//     console.log(pageNum.slice(i, i + 10));
//   }
// }
// export default PagenationBtn;

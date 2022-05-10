import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Nav from "./components/Nav";
import Result from "./Result/Result";
import styles from "./App.module.css";
import Login from "./SignIn/Login";
import SignUp from "./SignIn/SignUp";
import CategoryMain from "./Category/CategoryMain";

function App() {
  const onClick = () => {
    // TOP버튼 펑션
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };
  return (
    <div className={styles.main}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} /> {/* react-router-dom 6버전부터 바뀜 */}
          <Route path="/:category" element={<CategoryMain />} />
          <Route path="/search" element={<Result />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
      <button className={styles.topBtn} onClick={onClick}>
        TOP
      </button>
    </div>
  );
}

export default App;

// /search?title=제목&view=한페이지 책 갯수

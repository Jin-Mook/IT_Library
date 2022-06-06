import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Nav from "./components/Nav";
import CategoryResult from "./Result/CategoryResult";
import Result from "./Result/Result";
import styles from "./App.module.css";
import Login from "./SignIn/Login";
import SignUp from "./SignIn/SignUp";
import CategoryMain from "./Category/CategoryMain";
import BookDetail from "./Detail/BookDetail";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState(false);

  const onClick = () => {
    // TOP버튼 펑션
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };
  return (
    <div className={styles.main}>
      <Router>
        <Nav login={login} />
        <Routes>
          <Route path="/" element={<Home />} /> {/* react-router-dom 6버전부터 바뀜 */}
          <Route path="/category" element={<CategoryMain />} />
          <Route path="/category/search/:categoryId" element={<CategoryResult />} />
          <Route path="/search" element={<Result />} />
          <Route path="/login" element={<Login setLogin={setLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/detail/:bookId" element={<BookDetail />} />
        </Routes>
      </Router>
      <button className={styles.topBtn} onClick={onClick}>
        TOP
      </button>
    </div>
  );
}

export default App;

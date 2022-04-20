import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Nav from "./Nav";
import Result from "./Result";
import styles from "./App.module.css";

function App() {
  const onClick = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };
  return (
    <div className={styles.main}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} /> {/* react-router-dom 6버전부터 바뀜 */}
          <Route path="/:title" element={<Result />} />
        </Routes>
      </Router>
      <button className={styles.topBtn} onClick={onClick}>
        TOP
      </button>
    </div>
  );
}

export default App;

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
import { createStore } from "redux";
import { Provider } from "react-redux";
//Provider는 어떠한 컴포넌트들에게 리덕스를 제공할 것인가에 대한 울타리와 같은 것

function reducer(currentState, action) {
  if (currentState === undefined) {
    return {
      number: 0,
    };
  }
  const newState = { ...currentState };
  if (action.type === "PLUS") {
    newState.number++;
  }
  return newState;
}
const store = createStore(reducer);

function App() {
  const onClick = () => {
    // TOP버튼 펑션
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };
  return (
    <div className={styles.main}>
      <Router>
        <Provider store={store}>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} /> {/* react-router-dom 6버전부터 바뀜 */}
            <Route path="/category" element={<CategoryMain />} />
            <Route path="/category/search/:categoryId" element={<CategoryResult />} />
            <Route path="/search" element={<Result />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/detail/:bookId" element={<BookDetail />} />
          </Routes>
        </Provider>
      </Router>
      <button className={styles.topBtn} onClick={onClick}>
        TOP
      </button>
    </div>
  );
}

export default App;

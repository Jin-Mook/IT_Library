import styles from "./Home.module.css";
import Search from "./Search";
import Main from "./Main";
import Category from "./Category";

function Home() {
  // 메인화면

  return (
    <div>
      <Search />
      <Category />
      <Main />
    </div>
  );
}

export default Home;

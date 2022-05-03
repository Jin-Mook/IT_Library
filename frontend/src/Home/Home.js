import Search from "../components/Search";
import Main from "./Main/Main";
import Category from "../Category/Category";

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

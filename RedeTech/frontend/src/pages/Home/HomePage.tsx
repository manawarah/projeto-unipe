import "./Home.scss";
import Feed from "../../components/Feed/Feed";
import Search from "../../components/Search/Search";

export default function HomePage() {

  return (
    <>
      <div>
        <Search />
      </div>
      <div className="home-content">
        <Feed />
      </div>
    </>
  );
}

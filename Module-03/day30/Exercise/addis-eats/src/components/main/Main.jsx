import Menu from "./menu/Menu";
import Sidebar from "./sidebar/Sidebar";
import "./Main.css";

function Main() {
  return (
    <div className="main">
      <Menu />
      <Sidebar />
    </div>
  );
}

export default Main;

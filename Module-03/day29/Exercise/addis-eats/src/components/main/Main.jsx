import Menu from "./menu/Menu";
import Sidebar from "./sidebar/Sidebar";
import "./Main.css";

function Main() {
  return (
    <div className="main">
      <Sidebar />
      <Menu />
    </div>
  );
}

export default Main;

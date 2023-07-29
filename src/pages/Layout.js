import { Link, Outlet } from "react-router-dom";
import { AiFillCar, AiOutlineGithub } from "react-icons/ai";

const Layout = () => {
  return (
    <div>
      <header className="header">
        <nav className="header-nav">
          <li className="header-li">
            <a>
              <AiFillCar className="icon" />
            </a>
          </li>
          <li className="header-li">
            <Link to="/">Home</Link>
          </li>
          <li className="header-li">
            <Link to="/cars">Cars</Link>
          </li>
          <li className="header-li">
            <a>
              <AiOutlineGithub className="icon" />
            </a>
          </li>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

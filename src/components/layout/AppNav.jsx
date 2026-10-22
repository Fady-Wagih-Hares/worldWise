import styles from "./AppNav.module.css";
// import { nav } from "../components/AppNav.module.css";
import { NavLink } from "react-router-dom";

const AppNav = () => {
  return (
    <nav
      // className={nav}
      className={styles.nav}>
      <ul>
        <li>
          {/* declarative way */}
          <NavLink to="cities"> Cities </NavLink>
        </li>
        <li>
          <NavLink to="countries"> Countries </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default AppNav;

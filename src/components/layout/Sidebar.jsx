import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/* <p>List Of Cities</p> */}
      {/* the component that show the content of the route that it nested one  => Outlet like children prop*/}
      <Outlet />
      <Footer copyright={styles.copyright} footer={styles.footer} />
    </div>
  );
};
export default SideBar;

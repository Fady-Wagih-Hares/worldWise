import SideBar from "../components/layout/Sidebar";
// import AppNav from "./../components/AppNav";
import styles from "./AppLayout.module.css";
import Map from "../features/cities/components/Map";
import User from "../components/layout/User";
const AppLayout = () => {
  return (
    <div className={styles.app}>
      {/* Nested Routes => when we need to control part of UI by part of URL | that thing displayed in the UI because we are in it route */}
      <SideBar />
      {/* <AppNav />
      <p>App</p> */}
      <Map />
      <User />
    </div>
  );
};
export default AppLayout;

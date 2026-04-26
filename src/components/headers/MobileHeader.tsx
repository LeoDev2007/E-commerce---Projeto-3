
import DrawerMenu from "../DrawerMenu";
import SearchBar from "../ui_elements/SearchBar";
import styles from "../../styles/components_CSS/Header.module.css";



const MobileHeader = () => {
  return (
    <div className={styles.container}>
      <div>
        <DrawerMenu />
      </div>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
    </div>
  );
};

export default MobileHeader;

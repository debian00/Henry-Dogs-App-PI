import styles from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  return (
    <header className={styles.header}>
      <NavLink to="/home">        
      </NavLink>
      <div className={styles.navcont}>
        <NavLink className={styles.navlink} to="/create">
          <button className={styles.glassbtn} >Agregar perrito</button>
        </NavLink>
        <SearchBar onSearch={onSearch} />
        
      </div>    
    </header>
  );
};

export default Navbar;

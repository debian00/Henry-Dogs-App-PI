import styles from "./Landing.module.css";
import {NavLink, NavLinkLink} from "react-router-dom"


export default function LandingPage () {
  return (    
    <div className={styles.maincontainer}>
    <div className={styles.subcontainer}>
      <h1 className={styles.title}>Henry <br></br>Dogs</h1>
      <div className={styles.buttoncontainer}>
        <NavLink className={styles.navlink} to="/home">
          <button className={styles.glassbtn}>Entrar</button>
        </NavLink>
      </div>
    </div>
  </div>
  )
};



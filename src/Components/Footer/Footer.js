import React from 'react';
import style from "./Footer.module.css";


function Footer() {
  return (
    <div id={style.footer}>
        <p>Copyright <i className="fa-solid fa-copyright"></i> 2022 All rights reserved.</p>
    </div>
  )
}

export default Footer;
import React from 'react'
import styles from '../styles/Header.module.css'



const Header = () => {
  return (
    <>
      <div className={`${styles.header}`}>
        {/* <span>t</span><span>oday</span> */}
        <span>今日待办本</span>
      </div>
    </>
  )
}

export default Header
import React from 'react'
import styles from '../styles/Header.module.css'
import Task from './Task'


const Header = () => {
  return (
    <>
      <div>
        <h3>today</h3>
      </div>

      <main>
        今日还未添加任务，请点击下方添加待办事项<Task />
      </main>

      <footer>
        添加任务
      </footer>
    </>
  )
}

export default Header
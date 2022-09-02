import React from 'react'
import styles from '../styles/NewTask.module.css' 

export const NewTask = () => {
  return (
    <>
      <div className={`${styles.createTask}`}>
        <input placeholder='准备做什么?' ></input>
        <div className='submit'>添加</div>

        {/* 最好可以加入多项子任务 */}
        <input placeholder='添加描述...'></input>

        {/* 快速选择日期,循环任务和目标放在另外模块 */}
        <div>今天</div>
        <div>明天</div>
        <div>选择日期</div>
        <div>加入待办箱</div>

        {/* 选择优先级 ，默认4*/}
        <div>优先级icon</div>
        
      </div>
    </>
  )
}

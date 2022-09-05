import React from 'react'
import styles from '../styles/NewTask.module.css' 

export const NewTask = ({method, setEdit, title, description, rank, isFinish, fn , inputTitle, inputDescription}) => {
  // console.log(title)
  return (
    <>
      <div className={`${styles.createTask}`}>

        <div onClick={() => setEdit(false)} className={`${styles.cancel}`}><i className={`bx bx-x`}></i></div>

        <div className={`${styles.title}`} >
          <input autoFocus type="text" onChange={inputTitle} value={title} placeholder='准备做什么?' ></input>

          {/* TODO:添加自动换行，最好可以加入多项子任务 */}
          <input type="text" onChange={inputDescription} value={description} className={`${styles.description}`} placeholder='添加描述...'></input>

        </div>

        {/* 快速选择日期,循环任务和目标放在另外模块 */}
        <div className={`${styles.select}`}>
          {/* TODO:默认今日，点击打开选择日历 */}
          <div>今天</div>
          {/* 选择优先级 ，默认4*/}
          <div className={`${styles.rank}`}>优先级</div>
          <div className={`${styles.inbox}`}>添加到待办箱</div>

        </div>

        <div className={`${styles.icon}`}>
          <div>循环icon</div>
          <div>提醒icon</div>
        </div>

        
        <div onClick={fn} className={`${styles.save}`}>{method === 'edit' ? '保 存' : '添 加'}</div>
        
      </div>
    </>
  )
}

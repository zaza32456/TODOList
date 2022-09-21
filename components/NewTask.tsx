import React, { useState } from 'react'
import styles from '../styles/NewTask.module.css' 
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import Date from './DateSelect';


export const NewTask = ({method, setEdit, title, description, setRank, rank, isFinish, fn , inputTitle, inputDescription}) => {
  // console.log(title)
  const [rankMenu, setRankMenu] = useState(false)


  // 选择优先级
  const handleRank = (taskRank:0 | 1 | 2 | 3 ) => {
    setRank(taskRank)
    setRankMenu(!rankMenu)
    console.log(rankMenu)
    console.log(taskRank)
  }

  return (
    <>
      <div className={`${styles.mask}`}></div>



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
          <div className={`${styles.date} ${styles.btn__base}`}>今天
            <div className={`${styles.datebar}`}>
              <Date />
            </div>
          </div>
          
          {/* 选择优先级 ，默认4*/}

          <div onClick={() => setRankMenu(!rankMenu)} className={`${styles.rank} ${styles.btn__base}`}>{rank === 4? '优先级': `优先级 : P${rank + 1}`}
            { rankMenu &&
              <ul className={`${styles.isOpen}`}>
                <li onClick={() => handleRank(0)} className={`${styles.btn__base}`}>P1</li>
                <li onClick={() => handleRank(1)}  className={`${styles.btn__base}`}>P2</li>
                <li onClick={() => handleRank(2)}  className={`${styles.btn__base}`}>P3</li>
                <li onClick={() => handleRank(3)}  className={`${styles.btn__base}`}>P4</li>
              </ul>
            }
          </div>

          {/* <div className={`${styles.inbox}`}>添加到待办箱</div> */}

        </div>

        {/* <div className={`${styles.icon}`}>
          <div>循环icon</div>
          <div>提醒icon</div>
        </div> */}

        
        <div onClick={fn} className={`${styles.save}`}>{method === 'edit' ? '保 存' : '添 加'}</div>
        
      </div>
    </>
  )
}

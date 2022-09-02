import React, { useEffect, useState } from 'react'
import { taskItem } from '../models/task'
import styles from '../styles/Task.module.css'
import axios from 'axios'
import { UnfinishItem } from './UnfinishItem'
import FinishItem from './FinishItem'
// import 'boxicons'

// ===========================   任务面板 > 面板分区标题   ===========================
const Partition = ({text,children}) => {
  return (
      <div className={`${styles.taskContainer} ${styles.finished}`}>      

        <div className={`${styles.flex} ${styles.taskHeader} `}>
          <span className={`${styles.date}`}>今日</span> {text} 
            <span className={`${styles.count}`}> 2 / 5</span> 
              <i className={`bx bx-down-arrow  ${styles.icon}`}></i>
        </div>
        {children}
      </div>
  )
}

// ===========================   任务面板   ===========================

const Task = () => {

  // 大屏时间模块
  let date = new Date()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  // 显示24小时制的0
  const formatDate = (date) => {
    if (date < 10) {
      date = '0' + date.toString()
      return date
    } 
    else {
      return date
    }
  }
  // console.log(date)
   

  const [taskArray, setTaskArray] = useState<taskItem[] | []>([])
  
  // 首次渲染组件后获得数据

  useEffect(() => {
    axios.get('http://localhost:3001/task')
      .then(res => {
          console.log("promise fulfilled")
          setTaskArray(res.data)
        })
  },[])


  console.log("taskArray1 = ", taskArray)

  return (
    <>
      {/* <div>今日还未添加任务，请点击下方添加待办事项</div> */}
      <div className={`${styles.flex} ${styles.largeView}`}>
          <div className={`${styles.flex} ${styles.timeContainer}`}>
            <div>{formatDate(hour)}:{formatDate(minute)}</div>
            <div className={`${styles.day}`}>{`${month}月${day}日`}</div>  
          </div>
          <input type="text" id="task-title" name="task-title" minLength={2}  className={`${styles.input}`} placeholder='快速添加任务'></input>
      </div>

      {/* 已完成面板 */}
      <div className={`${styles.taskContainer} ${styles.unfinished}`}>      
        <div className={`${styles.flex} ${styles.taskHeader}`}>
          <span className={`${styles.date}`}>今日</span> 待完成 <span className={`${styles.count}`}> 3 / 5</span>
        </div>

        <ul>
          {taskArray.filter( (item:taskItem) => !item.isFinish )
                    .map((item,i) => (
                      <li key={i}>
                        <div className={`${styles.flex} ${styles.taskItem}`}>
                          <div className={`${styles.checkbox}`}>
                            <i className={`bx bxs-heart-circle ${styles.finishIcon}`} ></i>
                          </div>
                            <div className={`${styles.flex} ${styles.taskItemMain}`}>
                              <div className={styles.title}>
                                {item.title}
                              </div>
                              <div className={styles.description}>
                                {item.description}
                              </div>
                            </div>
                          <div className={`${styles.flex} ${styles.delete}`}>
                            <i className={`bx bx-pen ${styles.edit} ${styles.transfrom}`}></i>
                            <i className={`bx bx-x ${styles.transfrom}`}></i>
                          </div>
                      </div>
                    </li>
          ))}

        </ul>
      </div>

     {/* 未完成面板 */}
      <Partition text="未完成">
          <UnfinishItem taskArray={taskArray}/>
      </Partition>
    </>
  )
}

export default Task
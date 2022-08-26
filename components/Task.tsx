import React from 'react'
import { taskItem } from '../models/task'
import styles from '../styles/Task.module.css'
// import 'boxicons'

const Task = () => {
  let date = new Date()
  console.log(typeof(date))
  let taskItem1: taskItem = {
    title : "今天把HTML结构写好",
    description : "参考XXXX……",
    rank : 2,
    isFinish : false,
  }
  return (
    <>
      {/* <div>今日还未添加任务，请点击下方添加待办事项</div> */}
      <ul>
        <li>
          <div className={`${styles.flex} ${styles.taskItem}`}>
            <div className={`${styles.checkbox}`}>
              ○
            </div>
              <div className={`${styles.flex} ${styles.taskItemMain}`}>
                <div className={styles.title}>
                  {taskItem1.title}
                </div>
                <div className={styles.description}>
                  {taskItem1.description}
                </div>
              </div>
            <div className={`${styles.delete}`}>
              X
            </div>
          </div>
        </li>
        
        <li>
          <div className={`${styles.flex} ${styles.taskItem}`}>
            <div className={`${styles.checkbox}`}>
              ○
            </div>
              <div className={`${styles.flex} ${styles.taskItemMain}`}>
                <div className={styles.title}>
                  {taskItem1.title}
                </div>
                <div className={styles.description}>
                  {taskItem1.description}
                </div>
              </div>
            <div className={`${styles.delete}`}>
              X
            </div>
          </div>
        </li>

        <li>
          <div className={`${styles.flex} ${styles.taskItem}`}>
            <div className={`${styles.checkbox}`}>
              ○
            </div>
              <div className={`${styles.flex} ${styles.taskItemMain}`}>
                <div className={styles.title}>
                  {taskItem1.title}
                </div>
                <div className={styles.description}>
                  {taskItem1.description}
                </div>
              </div>
            <div className={`${styles.delete}`}>
              X
            </div>
          </div>
        </li>

      </ul>
    </>
  )
}

export default Task
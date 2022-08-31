import React from 'react'
// ASK：可以在子组件中导入父组件的css文件吗？
import styles from '../styles/Task.module.css'
import { taskItem } from '../models/task'

export const UnfinishItem = ({taskArray}) => {
  console.log("taskArray2=",taskArray)
  return (
    <>
        <ul>
        {taskArray.filter( (item:taskItem) => item.isFinish )
                    .map((item,i) => (
                      <li key={i}>
                        <div className={`${styles.flex} ${styles.taskItem}`}>
                          <div className={`${styles.checkbox}`}>
                            <i className='bx bx-check-circle' ></i>
                          </div>
                            <div className={`${styles.flex} ${styles.taskItemMain}`}>
                              <div className={styles.title}>
                                {item.title}
                              </div>
                            </div>
                          <div className={`${styles.delete}`}>
                            <i className={`bx bx-redo ${styles.unmake}`}></i>
                          </div>
                        </div>
                      </li>
          ))}         

        </ul>
    </>
  )
}

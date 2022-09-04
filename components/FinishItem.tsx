import React from 'react'
// ASK：可以在子组件中导入父组件的css文件吗？
import styles from '../styles/Task.module.css'
import { taskItem } from '../models/task'
import axios from 'axios'

export const FinishItem = ({taskArray, setTaskArray}) => {
  // console.log("taskArray2=",taskArray)

  // 撤销完成
  const undoTask = (id) => {
    const task = (taskArray.find(task => task.id === id)) 
    const changedTask = {...task, isFinish: false}

    axios.put(`http://localhost:3001/task/${id}`, changedTask)
        .then(res =>{
          console.log("undoTask", res.data)
          // 改变客户端状态
          setTaskArray(taskArray.map(item => item.id !==id?item:changedTask))
        })
  }

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
                            <i onClick={() => {undoTask(item.id)}} className={`bx bx-redo ${styles.unmake}`}></i>
                          </div>
                        </div>
                      </li>
          ))}         

        </ul>
    </>
  )
}

import React from 'react'
import { taskItem } from '../models/task'
// import 'boxicons'

const Task = () => {
  let taskItem1: taskItem = {
    title : "今天把HTML结构写好",
    rank : 2,
    isFinish : false,
  }
  return (
    <>
      <ul>
        <li>
          <div>
            <div>
              {taskItem1.title}
            </div>
            <div>
            </div>
          </div>
        </li>
      </ul>
    </>
  )
}

export default Task
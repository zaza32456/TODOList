import React, { useEffect, useState } from 'react'
import { taskItem } from '../models/task'
import styles from '../styles/Task.module.css'
import axios from 'axios'
import { FinishItem } from './FinishItem'
import { NewTask } from './NewTask'
// import 'boxicons'

// ===========================   任务面板 > 面板分区标题   ===========================
const Partition = ({text, isFinish, taskArray, children}) => {
  return (
      <div className={`${styles.taskContainer} ${styles[isFinish]}`}>      

        <div className={`${styles.flex} ${styles.taskHeader} `}>
          <span className={`${styles.date}`}>今日</span> {text} 
            <span className={`${styles.count}`}> {taskArray.filter(task => task.isFinish === isFinish).length} / {taskArray.length}</span> 
        </div>
        {children}
      </div>
  )
}

// ===========================   rank-color   ===========================
const taskColor = (rank:0|1|2|3|4) => {
  console.log("switchrank")
  switch(rank) {
    case(0):
    console.log("rank", 0)
      return `${styles.p1}`;
    case(1):
      return `${styles.p2}`;
    case(2):
      return `${styles.p3}`;
    default:
      break;
  }

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
   

  const [taskArray, setTaskArray] = useState<taskItem[]>([])
  
  // 子组件回调方法、任务状态设置
  const [title, setTitle] = useState("")
  const [quickTitle, setQuickTitle] = useState("")
  const [description, setDescription] = useState("")
  const [rank, setRank] = useState<0|1|2|3|4>(4)
  const [isFinish, setIsfinish] = useState(false)
  const [id, setId] = useState("")
  // 编辑面板开关状态
  const [edit, setEdit] = useState(false)
  const [add, setAdd] = useState(false)
  const [confirm, setConfirm] = useState(false)

  // 清空状态
  const clearUp = () => {
    setTitle("")
    setDescription("")
    setRank(4)
    setId("")
  }
  
  // 添加新任务
  const addTask = () => {
      console.log("click addTask")
      const taskObeject:taskItem = {
        id : (Math.random()+ new Date().getTime()).toString(32).slice(0,8),
        title : quickTitle ,
        description : description,
        rank : rank,
        isFinish : false,
        date : new Date().toLocaleDateString(),
      }
      console.log("创建任务", taskObeject)
  
        // 改变服务器端数据
      axios.post(`http://localhost:3001/task/`, taskObeject)
        .then(res =>{
          console.log("put", res.data)
          // 改变客户端状态
          setTaskArray(taskArray.concat(taskObeject))
          clearUp()
          setQuickTitle("")
          setAdd(false)
        })

  }

  // 修改已有任务
  const editTask = (e) => {
    const taskObeject:taskItem = {
      id : id,
      title : title ,
      description : description,
      rank: rank,
      isFinish: isFinish,
    }
    console.log("提交任务", taskObeject)

      // 改变服务器端数据
    axios.put(`http://localhost:3001/task/${id}`, taskObeject)
      .then(res =>{
        // 改变客户端状态
        setTaskArray(taskArray.map(item => item.id !==id?item:taskObeject))
        console.log("put", taskObeject)
        clearUp()

        setEdit(false)
      })
  }

  // 删除未完成任务
  const del = (id) => {
    axios.delete(`http://localhost:3001/task/${id}`)
    const array = taskArray.filter(task => task.id !== id)
    setTaskArray(array)

    clearUp()
  }

  const inputQuickTitle = (e) => {
    console.log("QuickTitle", e.target.value)
    setQuickTitle(e.target.value)
  }

  const inputTitle = (e) => {
    console.log("title", e.target.value)
    setTitle(e.target.value)
  }

  const inputDescription = (e) => {
    console.log("description", e.target.value)
    setDescription(e.target.value)
  }

  // handle:完成任务
  // TODO:跟undo事件抽一个组件
  const finishTask = (id) => {
    const task = (taskArray.find(task => task.id === id)) 
    const changedTask = {...task, isFinish: true}

    axios.put(`http://localhost:3001/task/${id}`, changedTask)
        .then(res =>{
          console.log("finishTask", res.data)
          // 改变客户端状态
          setTaskArray(taskArray.map(item => item.id !==id?item:changedTask))
        })
  }
  
   
  // 首次渲染组件后获得数据
  useEffect(() => {
    axios.get('http://localhost:3001/task')
      .then(res => {
          console.log("promise fulfilled")
          setTaskArray(res.data)
        })
  },[])

  // 关闭面板后清空state
  useEffect(() => {
    edit === false? clearUp(): null
  },[edit,add])

  // console.log("taskArray1 = ", taskArray)

  return (
    <>
      {(add) && 
      <NewTask
        method="add"
        title={quickTitle}
        description={description}
        rank={rank}
        setRank={setRank}
        isFinish={isFinish}
        fn={addTask}
        inputTitle={inputQuickTitle}
        inputDescription={inputDescription}
        setEdit = {setAdd}
      />}

        {/* 编辑模式 */}
      {(edit) && 
      <NewTask
         method="edit"
         title={title}
         description={description}
         rank={rank}
         setRank={setRank}
         isFinish={isFinish}
         fn={editTask}
         inputTitle={inputTitle}
         inputDescription={inputDescription}
         setEdit = {setEdit}
         />}

      <div className={`${styles.flex} ${styles.largeView}`}>
          <div className={`${styles.flex} ${styles.timeContainer}`}>
            <div>{formatDate(hour)}:{formatDate(minute)}</div>
            <div className={`${styles.day}`}>{`${month}月${day}日`}</div>  
          </div>
          <div className={`${styles.flex} ${styles.addBar}`}>
            <input autoComplete="off" onChange={inputQuickTitle} value={quickTitle} type="text" id="task-title" name="task-title" className={quickTitle.length > 0? `${styles.typing} ${styles.input}`: `${styles.input}`} placeholder='快速添加任务'></input>
              <div className={`${styles.btn}`}>
                <label htmlFor="task-title" ><i onClick={() => setQuickTitle("")} className={` bx bx-x ${styles.clear}`}></i></label>
                <div onClick={() => setAdd(true)} className={`${styles.more}`}>更多...</div>
                <div onClick={addTask}>添加</div>
              </div>
          </div>
      </div>

    {/* 删除确认 */}
    { confirm && 
      <div className={`${styles.confirm}`}>
        <div className={`${styles.mask}`}></div>
          <div className={`${styles.text}`}>
          确认删除任务？
          <div>
            <div onClick={() => {setConfirm(false),del(id)}}>确认</div><div onClick={() => {setConfirm(false)}}>取消</div>
          </div>
        </div>
      </div>
    }


      {/* 待完成面板 */}
      <Partition isFinish={false} taskArray={taskArray} text="待完成">

        <ul className={`${styles.unfinished}`}>
          {taskArray.filter( (item:taskItem) => !item.isFinish )
                    .map((item,i) => (
                      <li key={i}>
                        <div className={`${styles.flex} ${styles.taskItem}`}>
                          <div onClick={() => {finishTask(item.id)}} className={`${styles.checkbox}`}>

                            <i className={`bx bxs-heart-circle ${styles.finishIcon} ` + taskColor(item.rank)} ></i>

                          </div>
                          <div onClick={() => {finishTask(item.id)}} className={`${styles.flex} ${styles.taskItemMain}` }>
                            <div className={styles.title}>
                              {item.title}
                            </div>
                            <div className={styles.description}>
                              {item.description}
                            </div>
                          </div>
                          <div className={`${styles.flex} ${styles.delete}`}>
                            <i 
                              onClick={() => {
                                setEdit(true) 
                                setId(item.id)
                                setTitle(item.title)
                                setDescription(item.description)
                                setRank(item.rank)
                                setIsfinish(item.isFinish)
                                }}
                              className={`bx bx-pen ${styles.edit} ${styles.transfrom}`}></i>
                            <i onClick={() => {setConfirm(true), setId(item.id)}} className={`bx bx-x ${styles.transfrom}`}></i>
                          </div>
                        </div>
                    </li>
          ))}

        </ul>
      </Partition>

     {/* 已完成面板 */}
      <Partition isFinish={true} taskArray={taskArray} text="已完成">
          <FinishItem setTaskArray={setTaskArray} taskArray={taskArray}/>
      </Partition>
    </>
  )
}

export default Task
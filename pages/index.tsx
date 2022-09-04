import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Task from '../components/Task'
import Tabbar from '../components/Tabbar'
import { NewTask } from '../components/NewTask'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      
      <Head>
        <title>TODOLIST</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'></link>
      </Head>
      <Header />



      <main className={`${styles.main}`}>
        <Task />
      </main>
      
      <Tabbar />

    </div>
  )
}

export default Home

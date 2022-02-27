import styles from '../../styles/home.module.scss';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      {/* tudo que eu jogar dentro deste head aqui sera anexado no head la do document */}
      <Head>
        <title>ig.news</title>
      </Head>

      <h1>
        Hello World
      </h1>
    </>
  )
}

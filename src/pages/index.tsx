import Image from 'next/image';
import girlCodingImg from '../../public/images/avatar.svg';

import styles from './home.module.scss';

import Head from 'next/head';

export default function Home() {
  return (
    <>
      {/* tudo que eu jogar dentro deste head aqui sera anexado no head la do document */}
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer} >
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all publications <br />
            <span>for $9.98 month</span>
          </p>
        </section>

        <Image src={girlCodingImg} alt="Girl coding" />
      </main>
    </>
  )
}

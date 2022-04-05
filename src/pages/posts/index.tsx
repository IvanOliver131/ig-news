import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href='#'>
            <time>12 de março de babbablalb</time>
            <strong>LBALBLALBALBÇLAABLALBLA</strong>
            <p>AJKLSDÇFJLKASDFKLASDLKFJLKASDJFLKASDJLFKJASDLKFJASLDKFJLASDKJFLKSDAJLFKDSAJLFK</p>
          </a>
          <a href='#2'>
            <time>12 de março de babbablalb</time>
            <strong>LBALBLALBALBÇLAABLALBLA</strong>
            <p>AJKLSDÇFJLKASDFKLASDLKFJLKASDJFLKASDJLFKJASDLKFJASLDKFJLASDKJFLKSDAJLFKDSAJLFK</p>
          </a>
          <a href='#3'>
            <time>12 de março de babbablalb</time>
            <strong>LBALBLALBALBÇLAABLALBLA</strong>
            <p>AJKLSDÇFJLKASDFKLASDLKFJLKASDJFLKASDJLFKJASDLKFJASLDKFJLASDKJFLKSDAJLFKDSAJLFK</p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  // Quando for criar um custom type utilize o nome no 
  // lugar desse 2 ----- usei o 2 porque não sabia exatamente o que iria usar

  const response = await prismic.query([
    Prismic.predicates.at('document.type', '2')
  ], {
    fetch: ['title', 'content'],
    pageSize: 100,
  });


  console.log(JSON.stringify(response, null, 2));
  return {
    props: {}
  }


}
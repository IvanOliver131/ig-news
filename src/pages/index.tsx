/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next';
// import Image from 'next/image';
// import girlCodingImg from '../../public/images/avatar.svg';

import styles from './home.module.scss';

import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

// *** FORMAS DE POPULAR UMA PÁGINA ****//

// 1- Client-side
// 2- Server-side
// 3- Static Site Generation

// *************************************//

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  }
}

export default function Home({ product }: HomeProps) {
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
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton />
        </section>
               
        {/* <Image src={girlCodingImg} alt="Girl coding" /> */}
        <img src="../../public/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KYJtlIFVJyNdgHHeH4jW3dC', {
    //expand: ['product'] // Utiliza o 'expand' para pegar todos os dados do produto
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency', 
      currency: 'USD' 
    }).format(price.unit_amount / 100),

  };
  
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}

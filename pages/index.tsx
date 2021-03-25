import Head from 'next/head';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome</title>
      </Head>
      <h1>Protected Welcome Page</h1>
    </div>
  );
}

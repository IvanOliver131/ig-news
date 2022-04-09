import styles from './styles.module.scss';
import Link from 'next/link';

import Image from 'next/image';
import logoImg from '../../../public/images/logo.svg';

import { SignInButton } from '../SignInButton';
import { ActiveLink } from '../ActiveLink';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logoImg} alt="ig.news" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/" prefetch>
            <a>Home</a>
          </ActiveLink>    
          <ActiveLink activeClassName={styles.active} href="/posts" prefetch>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        
        <SignInButton />
      </div>
    </header>
  );
}
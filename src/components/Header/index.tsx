/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.scss";

import { SignInButton } from "../SignInButton";
import { ActiveLink } from "../ActiveLink";
import Image from "next/image";

// import Image from 'next/image';
// import logoImg from '../../../public/images/logo.svg';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        {/* <Image src={logoImg} alt="ig.news" /> */}
        <Image src="../../../public/images/logo.svg" alt="ig-news" />
        <nav>
          {/* os prefetchs eram apenas "prefetch" */}
          <ActiveLink activeClassName={styles.active} href="/" prefetch={false}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink
            activeClassName={styles.active}
            href="/posts"
            prefetch={false}
          >
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}

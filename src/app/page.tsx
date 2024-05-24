'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
export default function Home() {

  return (
    <main className={styles.main}>
      <Link href={'./about'} ><h1>Go to next Page!</h1></Link>
    </main>
  );
}

'use client'

import Link from "next/link";
import styles from "../page.module.css";
import { useLeavePageConfirm } from "../useBlock";
export default function About() {

  useLeavePageConfirm(true, 'nevers shown');
  return (
    <main className={styles.main}>
      
        <Link href={'/'}><h1>GO Home Page</h1></Link>
    </main>
  );
}

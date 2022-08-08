/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Link from "next/link";
import styles from "./index.module.css";

/*
  This component is not driven by a content model (yet! leaving this as an exercise to the reader...)
*/
export function NavBar({ label, navbarItems }) {
  const homeItem = navbarItems.find(item => item.path === "/");
  if (homeItem) {
    const restOfItems = navbarItems.filter(item => item.path !== "/");
    navbarItems = [homeItem, ...restOfItems];
  }
  return (
    <div className={styles.wrapper}>
      <img className={styles.logoImage} src="/sb-cld-logo.svg" alt="Logo" />
      {label && <span className={styles.logoLabel}>{label}</span>}
      {navbarItems.map((item, idx) => {
        return (
          <Link key={idx} href={item.path}>
            <a className={styles.item}>{item.title}</a>
          </Link>
        );
      })}
    </div>
  );
}

import * as React from "react";
import Link from "next/link";
import * as icons from "../icons";
import { SiteConfig } from "utils/types";

export type Links = Array<{ title: string; path: string }>;
type HeaderProps = {
  siteConfig: SiteConfig;
  links: Links;
};

const Header: React.FC<HeaderProps> = ({ siteConfig, links }) => {
  links = links.sort((a, b) => (a.path === "/" ? -1 : 0));

  const listItems = () => {
    return links.map((item) => {
      return (
        <li key={item.path}>
          <Link href={item.path}>{item.title}</Link>
        </li>
      );
    });
  };

  return (
    <div
      className="navbar bg-neutral text-neutral-content"
      data-sb-object-id={siteConfig.__id}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <icons.Hamburger />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content p-2 shadow bg-base-100 text-neutral rounded-box w-52"
          >
            {listItems()}
          </ul>
        </div>
        <a
          className="btn btn-ghost normal-case text-xl"
          data-sb-field-path=".title"
        >
          {siteConfig.title}
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{listItems()}</ul>
      </div>
      <div className="navbar-end">
        <a
          className="btn hidden md:flex"
          href="https://docs.stackbit.com/getting-started"
          target="_blank"
          rel="noreferrer"
        >
          Learn Stackbit
        </a>
      </div>
    </div>
  );
};

export default Header;

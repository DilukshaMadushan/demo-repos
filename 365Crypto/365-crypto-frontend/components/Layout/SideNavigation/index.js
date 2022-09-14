import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import StartTradingNowCard from "./StartTradingNowCard";
import { tabData } from "../common/TabData";
import { useRouter } from "next/router";
import { MdForum } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

const SideNavigation = () => {
  const { pathname } = useRouter();
  const router = useRouter();
  const [tabState, setTabState] = useState(pathname);

  useEffect(() => {
    setTabState(pathname);
  }, [pathname]);

  return (
    <div className={`${styles["side-nav"]}`}>
      <div className={`${styles["sidenav-top-div"]}`}>
        <Link href="/">
          <div className={`${styles["logo"]}`}>
            <div
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              <Image
                src={"/main_logo.png"}
                alt="365 Crypto Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </Link>
      </div>
      <div className={`${styles["sidenav-bottom-div"]}`}>
        <div className={`${styles["tab-div"]}`}>
          {tabData.map((item) => (
            <div
              className={`${styles["tabs"]}`}
              key={item.id}
              onClick={() => {
                setTabState(item.path);
                router.push(`${item.path}`, null, { shallow: true });
              }}
            >
              <div
                className={
                  tabState === item.path
                    ? `${styles["tab-icon-selected"]}`
                    : `${styles["tab-icon"]}`
                }
              >
                {item.icon}
              </div>
              <div className={`${styles["txt-div]"]}`}>
                <text
                  className={
                    tabState === item.path
                      ? `${styles["tab-text-selected"]}`
                      : `${styles["tab-text"]}`
                  }
                >
                  {item.title}
                </text>
              </div>
            </div>
          ))}
          <a href={process.env.FORUM_URL} target="_blank">
            <div
              className={`${styles["tabs"]}`}
              onClick={() => {
                // setTabState("/forums");
                // router.push("/forums", null, { shallow: true });
              }}
            >
              <div
                className={
                  tabState === "/forums"
                    ? `${styles["tab-icon-selected"]}`
                    : `${styles["tab-icon"]}`
                }
              >
                <MdForum size={"17px"} />
              </div>
              <div className={`${styles["txt-div]"]}`}>
                <text
                  className={
                    tabState === "/forums"
                      ? `${styles["tab-text-selected"]}`
                      : `${styles["tab-text"]}`
                  }
                >
                  Forums
                </text>
              </div>
            </div>
          </a>
        </div>
        <div className={`${styles["trading-card-div"]}`}>
          <StartTradingNowCard />
        </div>
      </div>
    </div>
  );
};

export default SideNavigation;

import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./index.module.css";

const GraphSkeleton = () => {
  return (
    <div className={`${styles["skeletonMain-div"]}`}>
      <div className={`${styles["skeletonTitle-div"]}`}>
        <Skeleton
          style={{ background: "#1b1a20" }}
          variant="text"
          width={"80%"}
          height={30}
        />
      </div>
      <div className={`row p-0 ${styles["skeletonBtn-div"]}`}>
        <div className={`col-9 ${styles["pair-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"40%"}
            height={25}
          />
        </div>
        <div className={`col-3`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"100%"}
            height={25}
          />
        </div>
        <div className={`row p-0 ${styles["skeletonName-div"]}`}>
          <div className={`col-2 p-0 ${styles["name-div"]}`}>
            <Skeleton
              style={{ background: "#1b1a20" }}
              variant="circle"
              width={18}
              height={18}
            />
            &nbsp;
            <Skeleton
              style={{ background: "#1b1a20" }}
              variant="text"
              width={"55%"}
              height={18}
            />
          </div>
          <div className={`col-10 pl-1 ${styles["name-div"]}`}>
            <Skeleton
              style={{ background: "#1b1a20" }}
              variant="circle"
              width={18}
              height={18}
            />
            &nbsp;
            <Skeleton
              style={{ background: "#1b1a20" }}
              variant="text"
              width={"20%"}
              height={18}
            />
          </div>
        </div>
      </div>
      <div className={`${styles["skeletonChart-div"]}`}>
        <Skeleton
          style={{ background: "#1b1a20" }}
          variant="rect"
          width={"100%"}
          height={"100%"}
        />
      </div>
    </div>
  );
};

export default GraphSkeleton;

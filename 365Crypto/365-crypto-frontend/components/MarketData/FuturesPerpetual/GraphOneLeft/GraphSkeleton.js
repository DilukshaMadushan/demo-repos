import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./index.module.css";

const GraphSkeleton = () => {
  return (
    <div className={`${styles["head-div"]}`}>
      <div className={`${styles["skeletonTitle-div"]}`}>
        <Skeleton
          style={{ background: "#1b1a20" }}
          variant="text"
          width={"80%"}
          height={30}
        />
      </div>
      <div className={`row p-0 ${styles["sub-div"]}`}>
        <div className={`col-3 ${styles["pair-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"100%"}
            height={15}
          />
        </div>
        <div className={`col-9 ${styles["value-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"100%"}
            height={15}
          />
        </div>
      </div>
      <div className={`row p-0 ${styles["sub-div"]}`}>
        <div className={`col-3 ${styles["pair-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"100%"}
            height={15}
          />
        </div>
        <div className={`col-9 ${styles["value-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"90%"}
            height={15}
          />
        </div>
      </div>
      <div className={`row p-0 ${styles["sub-div"]}`}>
        <div className={`col-3 ${styles["pair-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"100%"}
            height={15}
          />
        </div>
        <div className={`col-9 ${styles["value-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"80%"}
            height={15}
          />
        </div>
      </div>
      <div className={`row p-0 ${styles["sub-div"]}`}>
        <div className={`col-3 ${styles["pair-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"100%"}
            height={15}
          />
        </div>
        <div className={`col-9 ${styles["value-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"70%"}
            height={15}
          />
        </div>
      </div>
      <div className={`row p-0 ${styles["sub-div"]}`}>
        <div className={`col-3 ${styles["pair-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"100%"}
            height={15}
          />
        </div>
        <div className={`col-9 ${styles["value-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"60%"}
            height={15}
          />
        </div>
      </div>
      <div className={`row p-0 ${styles["sub-div"]}`}>
        <div className={`col-3 ${styles["pair-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"100%"}
            height={15}
          />
        </div>
        <div className={`col-9 ${styles["value-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"50%"}
            height={15}
          />
        </div>
      </div>
      <div className={`row p-0 ${styles["sub-div"]}`}>
        <div className={`col-3 ${styles["pair-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"100%"}
            height={15}
          />
        </div>
        <div className={`col-9 ${styles["value-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"40%"}
            height={15}
          />
        </div>
      </div>
      <div className={`row p-0 ${styles["sub-div"]}`}>
        <div className={`col-3 ${styles["pair-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"100%"}
            height={15}
          />
        </div>
        <div className={`col-9 ${styles["value-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"30%"}
            height={15}
          />
        </div>
      </div>
      <div className={`row p-0 ${styles["sub-div"]}`}>
        <div className={`col-3 ${styles["pair-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"100%"}
            height={15}
          />
        </div>
        <div className={`col-9 ${styles["value-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"20%"}
            height={15}
          />
        </div>
      </div>
      <div className={`row p-0 ${styles["sub-div"]}`}>
        <div className={`col-3 ${styles["pair-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"100%"}
            height={15}
          />
        </div>
        <div className={`col-9 ${styles["value-div"]}`}>
          <Skeleton
            style={{ background: "#1b1a20" }}
            variant="rect"
            width={"10%"}
            height={15}
          />
        </div>
      </div>
      <div className={`${styles["footer-div"]}`}>
        <Skeleton
          style={{ background: "#1b1a20" }}
          variant="text"
          width={"20%"}
          height={25}
        />
      </div>
    </div>
  );
};

export default GraphSkeleton;

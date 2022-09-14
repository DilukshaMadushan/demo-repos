import React from 'react';
import styles from './index.module.css';

// SET ENVIRONMENT BASE URL
const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;

const Card = ({ item }) => {
	return (
		<div className={` ${styles.cardDiv}`}>
			<div className={` ${styles.leftDiv}`}>
				<img
					className={` ${styles.img}`}
					src={`${STRAPI_BASE_URL}${item.article_thumbnail[0].url}`}
					alt=''
				/>
			</div>
			<div className={` ${styles.rightDiv}`}>
				{/* <div className={` ${styles.dateDiv}`}>
          {new Intl.DateTimeFormat("en-GB", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }).format(new Date(item.created_at))}
        </div> */}
				<div className={` ${styles.cardTitleDiv}`}>{item.deal_name}</div>
				<div className={` ${styles.descript}`}>{item.deal_summary}</div>
			</div>
		</div>
	);
};

export default Card;

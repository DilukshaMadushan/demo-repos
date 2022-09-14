import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

const SinglePost = ({ item }) => {
	return (
		<a className={styles.cardAnchor} href={item.news_url} target='_blank'>
			<div
				className={`${styles.card} `}
				style={{
					backgroundImage: ` linear-gradient(rgba(21,20,27,0.85), rgba(21,20,27,0.85)), url(${item.image_url})`,
				}}
			>
				<h1 className={styles.tittle}>{item.title}</h1>
				<p className={styles.expert}>{item.text}</p>
				<div className={styles.bottom}>
					{item.tickers.map((ticker, index) => (
						<button key={index} className={styles.button}>
							{ticker.symbol}
						</button>
					))}

					<p className={styles.date}>
						{new Intl.DateTimeFormat('en-GB', {
							month: 'short',
							day: '2-digit',
							year: 'numeric',
							hour: 'numeric',
							minute: 'numeric',
							second: 'numeric',
						}).format(new Date(item.date))}
					</p>
					<p
						className={
							item.sentiment === 'Positive'
								? styles.positiveTag
								: item.sentiment === 'Negative'
								? styles.negativeTag
								: item.sentiment === 'Neutral'
								? styles.neutralTag
								: ''
						}
					>
						| {item.sentiment}
					</p>
				</div>
			</div>
		</a>
	);
};

export default SinglePost;

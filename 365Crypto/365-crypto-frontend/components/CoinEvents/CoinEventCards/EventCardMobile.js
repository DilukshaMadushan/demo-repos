import React from 'react';
import styles from './index.module.css';
import CoinLogoCarousel from './CoinLogoCarousel';

const EventCardMobile = ({ item }) => {
	return (
		<div className={`col-sm-6  m-0 p-0 ${styles.cardDiv}`}>
			<div className={` ${styles.card}`}>
				<div className={` ${styles.logoSpaceDiv}`}>
					<CoinLogoCarousel coins={item.coins} />
				</div>
				<div className={` ${styles.dateNiconsDiv}`}>
					<div className={` ${styles.eventDateDiv}`}>
						<span className={` ${styles.evenDateSpan}`}>
							{new Intl.DateTimeFormat('en-GB', {
								month: 'short',
								day: '2-digit',
								year: 'numeric',
							}).format(new Date(item.dateEvent))}
						</span>
					</div>
					<div className={` ${styles.statusIconsDiv}`}>
						<div className={` ${styles.singleStatusIconDiv}`}>
							<img
								src='/hot-icon.png'
								alt=''
								className={
									item.isHot
										? styles.singleStatusIcon
										: styles.singleStatusIconHide
								}
							/>
							<img
								src='/trending-icon.png'
								alt=''
								className={
									item.isTrending
										? styles.singleStatusIcon
										: styles.singleStatusIconHide
								}
							/>
							<img
								src='/significant-icon.png'
								alt=''
								className={
									item.isSignificant
										? styles.singleStatusIcon
										: styles.singleStatusIconHide
								}
							/>
						</div>
					</div>
				</div>
				<div className={` ${styles.eventTitleDiv}`}>
					<span className={` ${styles.eventTitleSpan}`}>{item.title}</span>
				</div>
				<div className={` ${styles.eventdiscriptionDiv}`}>
					<p className={` ${styles.eventdiscription}`}>{item.description}</p>
				</div>
				<div className={` ${styles.buttonsDiv}`}>
					<a
						href={item.proof}
						target='_blank'
						className={` ${styles.proofButtonsDiv}`}
					>
						<button className={` ${styles.buttons}`}>Proof</button>
					</a>
					<a
						href={item.originalSource}
						target='_blank'
						className={` ${styles.sourceButtonsDiv}`}
					>
						<button className={` ${styles.buttons}`}>Source</button>
					</a>
				</div>
				<div className={` ${styles.footerDiv}`}>
					<div className={` ${styles.lineDiv}`}>
						<div className={` ${styles.line}`}></div>
					</div>
					<div className={` ${styles.addedDateDiv}`}>
						<span className={` ${styles.addedDate}`}>
							Added{' '}
							{new Intl.DateTimeFormat('en-GB', {
								month: 'short',
								day: '2-digit',
								year: 'numeric',
							}).format(new Date(item.createdDate))}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventCardMobile;

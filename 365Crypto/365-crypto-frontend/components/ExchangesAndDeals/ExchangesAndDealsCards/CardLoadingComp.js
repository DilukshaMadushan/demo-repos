import React from 'react';
import Link from 'next/link';
import styles from './index.module.css';
import Skeleton from '@material-ui/lab/Skeleton';

const CardLoadingComp = () => {
	return (
		<div className={`col-md-6 m-0 p-0 ${styles.cardDiv}`}>
			<div className={`${styles.loadingCard}`}>
				<div className={`${styles.upperDiv}`}>
					<div className={`${styles.upperLeftDiv}`}>
						<div className={`${styles.logoDiv}`}>
							<div className={`${styles.logo}`}>
								<Skeleton
									style={{ background: '#232327' }}
									variant='circle'
									width={'100%'}
									height={'100%'}
								/>
							</div>
						</div>
						<div className={`${styles.detailsDiv}`}>
							<div className={`${styles.dateDiv}`}>
								<Skeleton
									style={{ background: '#232327' }}
									variant='text'
									width={100}
									height={20}
								/>
							</div>
							<div className={`${styles.titleDiv}`}>
								<Skeleton
									style={{ background: '#232327' }}
									variant='text'
									width={150}
									height={50}
								/>
							</div>
						</div>
					</div>
					<div className={`${styles.upperRightDiv}`}>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={100}
							height={70}
						/>
					</div>
				</div>
				<div className={`${styles.lowerDiv}`}>
					<div className={`${styles.descriptDiv}`}>
						<div className={`${styles.descript}`}>
							<span className={`${styles.descriptTitle}`}>
								<Skeleton
									style={{ background: '#232327' }}
									variant='text'
									width={'100%'}
									height={30}
								/>
							</span>

							<Skeleton
								style={{ background: '#232327' }}
								variant='text'
								width={'100%'}
								height={30}
							/>
							<Skeleton
								style={{ background: '#232327' }}
								variant='text'
								width={'100%'}
								height={30}
							/>
						</div>
					</div>
					<div className={`${styles.linkDiv}`}>
						<Link href={`/exchanges-and-deals/123`}>
							<Skeleton
								style={{ background: '#232327' }}
								variant='text'
								width={175}
								height={30}
							/>
						</Link>
						<div className={`${styles.footerRightDiv}`}>
							<Skeleton
								style={{ background: '#232327' }}
								variant='text'
								width={80}
								height={40}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardLoadingComp;

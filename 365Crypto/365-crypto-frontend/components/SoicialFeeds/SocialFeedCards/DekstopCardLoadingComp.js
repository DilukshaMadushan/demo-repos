import React from 'react';
import styles from './index.module.css';
import Skeleton from '@material-ui/lab/Skeleton';

const DekstopCardLoadingComp = () => {
	return (
		<div className={`col-4 m-0 p-0 ${styles.cardDiv}`}>
			<div className={` ${styles.loadingCard}`}>
				<div className={` ${styles.upperDiv}`}>
					<div className={` ${styles.upperLeftDiv}`}>
						<div className={` ${styles.eventIconDiv}`}>
							<div className={` ${styles.eventIcon}`}>
								<Skeleton
									style={{ background: '#232327' }}
									variant='circle'
									width={'100%'}
									height={'100%'}
								/>
							</div>
						</div>
						<div className={` ${styles.platformIconDiv}`}>
							<div className={` ${styles.platformIcon}`}>
								<Skeleton
									style={{ background: '#232327' }}
									variant='circle'
									width={'100%'}
									height={'100%'}
								/>
							</div>
						</div>
					</div>
					<div className={` ${styles.upperRightDiv}`}>
						<div className={` ${styles.dateDiv}`}>
							<Skeleton
								style={{ background: '#232327' }}
								variant='text'
								width={75}
								height={15}
							/>
						</div>
						<div className={` ${styles.titleDiv}`}>
							<Skeleton
								style={{ background: '#232327' }}
								variant='text'
								width={120}
								height={30}
							/>
						</div>
					</div>
				</div>
				<div className={` ${styles.loadingLowerDiv}`}>
					<div className={` ${styles.loadingLowerLeftDiv}`}>
						<div className={` ${styles.imgDiv}`}>
							<div className={` ${styles.img}`}>
								<Skeleton
									style={{ background: '#232327' }}
									variant='rect'
									width={'100%'}
									height={'100%'}
								/>
							</div>
						</div>
					</div>
					<div className={` ${styles.loadingLowerRightDiv}`}>
						<div className={` ${styles.loadingDescripDiv}`}>
							<div className={` ${styles.para}`}>
								<Skeleton
									style={{ background: '#232327', marginRight: '5px' }}
									width={'100%'}
									variant='text'
									height={15}
								/>
								<Skeleton
									style={{ background: '#232327', marginRight: '5px' }}
									width={'100%'}
									variant='text'
									height={15}
								/>
								<Skeleton
									style={{ background: '#232327', marginRight: '5px' }}
									width={'100%'}
									variant='text'
									height={15}
								/>
								<Skeleton
									style={{ background: '#232327', marginRight: '5px' }}
									width={'50%'}
									variant='text'
									height={15}
								/>
							</div>
						</div>
						<div className={` ${styles.footerDiv}`}>
							<div className={` ${styles.coinBtnDiv}`}>
								<Skeleton
									style={{ background: '#232327', marginRight: '5px' }}
									variant='text'
									width={30}
									height={25}
								/>
								<Skeleton
									style={{ background: '#232327' }}
									variant='text'
									width={30}
									height={25}
								/>
							</div>

							<div className={` ${styles.SeeMoreDiv}`}>
								<div className={` ${styles.loadingSeeMore}`}>
									<Skeleton
										style={{ background: '#232327' }}
										variant='text'
										width={50}
										height={20}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DekstopCardLoadingComp;

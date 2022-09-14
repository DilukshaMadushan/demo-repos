import React from 'react';
import styles from './index.module.css';
import Skeleton from '@material-ui/lab/Skeleton';

const CardLoadingComp = ({ item }) => {
	return (
		<div className={` ${styles.loadingCardDiv}`}>
			<div className={` ${styles.leftDiv}`}>
				<div className={` ${styles.img}`}>
					<Skeleton
						style={{ background: '#232327' }}
						variant='rect'
						width={'100%'}
						height={'100%'}
					/>
				</div>
			</div>
			<div className={` ${styles.loadingRightDiv}`}>
				<div className={` ${styles.dateDiv}`}>
					<Skeleton
						style={{ background: '#232327' }}
						variant='text'
						width={40}
						height={20}
					/>
				</div>
				<div className={` ${styles.cardTitleDiv}`}>
					<Skeleton
						style={{ background: '#232327' }}
						variant='text'
						width={60}
						height={30}
					/>
				</div>
				<div className={` ${styles.descript}`}>
					<Skeleton
						style={{ background: '#232327' }}
						variant='text'
						width={'100%'}
						height={15}
					/>
					<Skeleton
						style={{ background: '#232327' }}
						variant='text'
						width={'100%'}
						height={15}
					/>
					<Skeleton
						style={{ background: '#232327' }}
						variant='text'
						width={'100%'}
						height={15}
					/>
					<Skeleton
						style={{ background: '#232327' }}
						variant='text'
						width={'100%'}
						height={15}
					/>
				</div>
			</div>
		</div>
	);
};

export default CardLoadingComp;

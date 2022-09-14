import React from 'react';
import styles from './index.module.css';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingComp = () => {
	return (
		<div className={styles.mainDiv}>
			<div className={styles.card}>
				<div className={styles.titleDiv}>
					<Skeleton
						style={{ background: '#232327' }}
						variant='text'
						width={'40%'}
						height={40}
					/>
				</div>
				<div className={styles.descriptDiv}>
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
					<Skeleton
						style={{ background: '#232327' }}
						variant='text'
						width={'50%'}
						height={15}
					/>
				</div>
				<div className={styles.footerDiv}>
					<Skeleton
						style={{ background: '#232327' }}
						variant='text'
						width={60}
						height={30}
					/>
				</div>
			</div>
		</div>
	);
};

export default LoadingComp;

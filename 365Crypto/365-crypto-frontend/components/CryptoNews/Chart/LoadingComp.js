import React from 'react';
import styles from './index.module.css';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingComp = () => {
	return (
		<div>
			<div className={`${styles.loadingUpper}`}>
				<Skeleton
					style={{ background: '#232327' }}
					variant='text'
					width={'20%'}
					height={35}
				/>
				<Skeleton
					style={{ background: '#232327' }}
					variant='text'
					width={'20%'}
					height={35}
				/>
				<Skeleton
					style={{ background: '#232327' }}
					variant='text'
					width={'20%'}
					height={35}
				/>
			</div>
			<div className={`${styles.loadingMiddle}`}>
				<Skeleton
					style={{ background: '#232327' }}
					variant='rect'
					width={'15%'}
					height={'10%'}
				/>
				<Skeleton
					style={{ background: '#232327' }}
					variant='rect'
					width={'48%'}
					height={'10%'}
				/>
				<Skeleton
					style={{ background: '#232327' }}
					variant='rect'
					width={'29%'}
					height={'10%'}
				/>
				<Skeleton
					style={{ background: '#232327' }}
					variant='rect'
					width={'87%'}
					height={'10%'}
				/>
				<Skeleton
					style={{ background: '#232327' }}
					variant='rect'
					width={'51%'}
					height={'10%'}
				/>
				<Skeleton
					style={{ background: '#232327' }}
					variant='rect'
					width={'18%'}
					height={'10%'}
				/>
				<Skeleton
					style={{ background: '#232327' }}
					variant='rect'
					width={'73%'}
					height={'10%'}
				/>
			</div>
			<div className={`${styles.loadingLower}`}>
				<Skeleton
					style={{ background: '#232327' }}
					variant='text'
					width={'10%'}
					height={30}
				/>
				<Skeleton
					style={{ background: '#232327' }}
					variant='text'
					width={'10%'}
					height={30}
				/>
				<Skeleton
					style={{ background: '#232327' }}
					variant='text'
					width={'10%'}
					height={30}
				/>
				<Skeleton
					style={{ background: '#232327' }}
					variant='text'
					width={'10%'}
					height={30}
				/>
				<Skeleton
					style={{ background: '#232327' }}
					variant='text'
					width={'10%'}
					height={30}
				/>
			</div>
		</div>
	);
};

export default LoadingComp;

import React from 'react';
import styles from './index.module.css';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingComp = () => {
	return (
		<div className={styles.mainDiv}>
			<div className={styles.card}>
				<div className={styles.leftDiv}>
					<div className={styles.img}>
						<Skeleton
							style={{ background: '#232327' }}
							variant='rect'
							width={'100%'}
							height={'100%'}
						/>
					</div>
				</div>
				<div className={styles.rightDiv}>
					<div className={styles.btnDiv}>
						<Skeleton
							style={{ background: '#232327', marginRight: '5px' }}
							variant='text'
							width={70}
							height={'100%'}
						/>
						<Skeleton
							style={{ background: '#232327', marginRight: '5px' }}
							variant='circle'
							width={25}
							height={25}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={30}
							height={'100%'}
						/>
					</div>
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
		</div>
	);
};

export default LoadingComp;

{
	/* <div className={styles.mainDiv}>
	<div className={styles.card}>
		<div className={styles.titleDiv}></div>
		<div className={styles.descriptDiv}></div>
		<div className={styles.footerDiv}></div>
	</div>
</div>; */
}

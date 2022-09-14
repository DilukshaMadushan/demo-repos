import React from 'react';
import styles from './index.module.css';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingComp = () => {
	return (
		<div className={styles.lowerDiv}>
			<div className={styles.loadingCard}>
				<div className={styles.cardInsideUpperDiv}>
					<Skeleton
						style={{ background: '#232327' }}
						variant='circle'
						width={60}
						height={60}
					/>
				</div>
				<div className={styles.cardInsideLowerDiv}>
					<div className={styles.infoDiv}>
						<div className={styles.dateDiv}>
							<div className={styles.date}>
								<Skeleton
									style={{ background: '#232327' }}
									variant='text'
									width={75}
									height={20}
								/>
							</div>
						</div>
						<div className={styles.tag}>
							<Skeleton
								style={{ background: '#232327' }}
								variant='rect'
								width={50}
								height={25}
							/>
						</div>
					</div>
					<div className={styles.event}>
						{' '}
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={100}
							height={40}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoadingComp;

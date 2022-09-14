import React from 'react';
import styles from './index.module.css';
import Skeleton from '@material-ui/lab/Skeleton';

const EventCardMobileLoadingComp = () => {
	return (
		<div className={`col-sm-6  m-0 p-0 ${styles.cardDiv}`}>
			<div className={` ${styles.loadingCard}`}>
				<div className={` ${styles.loadingCompLogoSpaceDiv}`}>
					<div className={` ${styles.loadingCompLogoDiv}`}>
						<Skeleton
							style={{ background: '#232327' }}
							variant='circle'
							width={60}
							height={60}
						/>
					</div>
				</div>
				<div className={` ${styles.coinNameDiv}`}>
					<Skeleton
						style={{ background: '#232327' }}
						variant='text'
						width={'20%'}
						height={30}
					/>
				</div>
				<div className={` ${styles.dateNiconsDiv}`}>
					<div className={` ${styles.eventDateDiv}`}>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'50%'}
							height={30}
						/>
					</div>
					<div className={` ${styles.statusIconsDiv}`}>
						<Skeleton
							className={` ${styles.singleStatusIconDiv} `}
							style={{ background: '#232327' }}
							variant='circle'
							width={25}
							height={25}
						/>
						<Skeleton
							className={` ${styles.singleStatusIconDiv} `}
							style={{ background: '#232327' }}
							variant='circle'
							width={25}
							height={25}
						/>
						<Skeleton
							className={` ${styles.singleStatusIconDiv} `}
							style={{ background: '#232327' }}
							variant='circle'
							width={25}
							height={25}
						/>
					</div>
				</div>
				<div className={` ${styles.eventTitleDiv}`}>
					<Skeleton
						style={{ background: '#232327' }}
						variant='text'
						width={'50%'}
						height={40}
					/>
				</div>
				<div className={` ${styles.eventdiscriptionDiv}`}>
					<Skeleton style={{ background: '#232327' }} variant='text' />
					<Skeleton style={{ background: '#232327' }} variant='text' />
					<Skeleton style={{ background: '#232327' }} variant='text' />
				</div>
				<div className={` ${styles.buttonsDiv}`}>
					<div className={` ${styles.proofButtonsDiv}`}>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'50%'}
							height={40}
						/>
					</div>
					<div className={` ${styles.sourceButtonsDiv}`}>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'50%'}
							height={40}
						/>
					</div>
				</div>
				<div className={` ${styles.footerDiv}`}>
					<div className={` ${styles.lineDiv}`}></div>
					<div className={` ${styles.addedDateDiv}`}>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'40%'}
							height={30}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventCardMobileLoadingComp;

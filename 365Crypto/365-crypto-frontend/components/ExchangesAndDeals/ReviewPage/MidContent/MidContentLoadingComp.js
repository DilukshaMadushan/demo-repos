import React from 'react';
import styles from './index.module.css';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { IoCheckbox } from 'react-icons/io5';
import Link from 'next/link';
import Skeleton from '@material-ui/lab/Skeleton';

const Dummy_Features_List = [
	{
		id: '1',
	},
	{
		id: '2',
	},
	{
		id: '3',
	},
	{
		id: '4',
	},
	{
		id: '5',
	},
];

const MidContentLoadingComp = () => {
	return (
		<div className={` ${styles.mainDiv}`}>
			<div className={` ${styles.introDiv}`}>
				<div className={` ${styles.titleDiv}`}>
					<Link href='/exchanges-and-deals'>
						<div className={` ${styles.loadingIconDiv}`}>
							<Skeleton
								style={{ background: '#232327' }}
								variant='rect'
								width={40}
								height={40}
							/>
						</div>
					</Link>
					<div className={` ${styles.loadingTitle}`}>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={200}
							height={50}
						/>
					</div>
				</div>
				<div className={` ${styles.introDescript}`}>
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
					<Skeleton
						style={{ background: '#232327' }}
						variant='text'
						width={'40%'}
						height={30}
					/>
				</div>
			</div>
			<div className={` ${styles.loadingContentDiv}`}>
				<div className={` ${styles.date}`}>
					<Skeleton
						style={{ background: '#232327' }}
						variant='text'
						width={75}
						height={30}
					/>
				</div>
				<div className={` ${styles.titleAndBtnDiv}`}>
					<div className={` ${styles.descriptiontitle}`}>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={200}
							height={50}
						/>
					</div>
					<Skeleton
						style={{ background: '#232327' }}
						variant='text'
						width={100}
						height={50}
					/>
				</div>
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
				<Skeleton
					style={{ background: '#232327' }}
					variant='text'
					width={'50%'}
					height={30}
				/>

				<div style={{ marginTop: '10px' }}>
					<Skeleton
						style={{ background: '#232327' }}
						variant='rect'
						width={'100%'}
						height={300}
					/>
				</div>
				<div className={` ${styles.description}`}>
					<p>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'60%'}
							height={20}
						/>
					</p>

					<p>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'30%'}
							height={20}
						/>
						<div className={` ${styles.centerSecondaryImagesDiv}`}>
							<div className={` ${styles.centerSecondaryImages}`}>
								<Skeleton
									style={{ background: '#232327' }}
									variant='rect'
									width={'100%'}
									height={'100%'}
								/>
							</div>
						</div>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'100%'}
							height={20}
						/>
						<Skeleton
							style={{ background: '#232327' }}
							variant='text'
							width={'75%'}
							height={20}
						/>
					</p>
				</div>
				<div className={` ${styles.footerdDiv}`}>
					<div className={` ${styles.footerLeftDiv}`}>
						<div className={` ${styles.footerTitleDiv}`}>
							<Skeleton
								style={{ background: '#232327' }}
								variant='text'
								width={150}
								height={40}
							/>
						</div>
						<div className={` ${styles.featuresListDiv}`}>
							{Dummy_Features_List.map((item, index) => (
								<div className={` ${styles.featuresListItem}`}>
									<div className={` ${styles.featuresListItemIcon}`}>
										<Skeleton
											style={{ background: '#232327' }}
											variant='rect'
											width={20}
											height={20}
										/>
									</div>
									<div className={` ${styles.featuresListItemDescript}`}>
										<Skeleton
											style={{ background: '#232327' }}
											variant='text'
											width={'28vw'}
											height={20}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className={` ${styles.footerRightDiv}`}>
						<Skeleton
							style={{ background: '#232327' }}
							variant='rect'
							width={'60%'}
							height={150}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MidContentLoadingComp;

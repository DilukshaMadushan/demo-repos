import React from 'react';
import styles from './index.module.css';
import Card from './Card';
import Skeleton from '@material-ui/lab/Skeleton';
import CardLoadingComp from './CardLoadingComp';
import { useRouter } from 'next/router';
import Link from 'next/link';
// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DummyList = [
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
	{
		id: '6',
	},
];

const RightSidebar = ({ strapi: { Articles_Data, IsLoading } }) => {
	const router = useRouter();
	const { reviewId } = router.query;

	return (
		<div className={` ${styles.mainDiv}`}>
			{IsLoading ? (
				<div style={{ marginBottom: '10px' }} className={` ${styles.titleDiv}`}>
					<Skeleton
						style={{ background: '#232327' }}
						variant='text'
						width={'50%'}
						height={50}
					/>
				</div>
			) : (
				<div className={` ${styles.titleDiv}`}>Related Reviews</div>
			)}
			<div className={` ${styles.scrollDiv}`}>
				{IsLoading
					? DummyList.map((item, index) => (
							<CardLoadingComp item={item} key={index} />
					  ))
					: Articles_Data !== null &&
					  Articles_Data.map((item, index) => (
							<a href={`/crypto-tax/${item.Slug}`} target='_blank'>
								{reviewId !== item.Slug ? <Card item={item} key={index} /> : ''}
							</a>
					  ))}
			</div>
		</div>
	);
};

RightSidebar.propTypes = {
	strapi: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	strapi: state.strapi,
});
export default connect(mapStateToProps, {})(RightSidebar);

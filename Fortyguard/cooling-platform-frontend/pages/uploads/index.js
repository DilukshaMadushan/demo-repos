import React from 'react';
import Layout from '../../components/Layout';
// import Uploads from '../../components/Uploads';
import Uploads from '../../components/Uploads';

const UploadsPage = () => {
	return (
		<div>
			{/* <Uploads /> */}
			<Uploads />
		</div>
	);
};

export default UploadsPage;

UploadsPage.getLayout = function getLayout(UploadsPage) {
	return <Layout>{UploadsPage}</Layout>;
};

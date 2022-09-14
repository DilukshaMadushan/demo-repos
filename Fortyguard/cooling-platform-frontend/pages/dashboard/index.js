import React from 'react';
import Layout from '../../components/Layout';

const DashboardPage = () => {
	return (
		<div>
			<div>This is the dashboard</div>
		</div>
	);
};

export default DashboardPage;

DashboardPage.getLayout = function getLayout(DashboardPage) {
	return <Layout>{DashboardPage}</Layout>;
};

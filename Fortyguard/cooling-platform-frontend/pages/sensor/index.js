import React from 'react';
import Layout from '../../components/Layout';
import Sensor from '../../components/Sensor';

const SensorPage = () => {
	return <div>

		<Sensor/>
	</div>;
};

export default SensorPage;

SensorPage.getLayout = function getLayout(SensorPage) {
	return <Layout>{SensorPage}</Layout>;
};

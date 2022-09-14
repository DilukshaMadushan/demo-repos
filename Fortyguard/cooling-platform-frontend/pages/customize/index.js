import React from 'react';
import Layout from '../../components/Layout';

const CustomizePage = () => {
	return <div>Customize</div>;
};

export default CustomizePage;

CustomizePage.getLayout = function getLayout(CustomizePage) {
	return <Layout>{CustomizePage}</Layout>;
};

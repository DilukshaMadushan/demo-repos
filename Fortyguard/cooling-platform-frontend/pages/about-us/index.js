import React from 'react';
import Layout from '../../components/Layout';

const AboutUsPage = () => {
	return <div>About Us</div>;
};

export default AboutUsPage;

AboutUsPage.getLayout = function getLayout(AboutUsPage) {
	return <Layout>{AboutUsPage}</Layout>;
};

import React from 'react';
import Layout from '../../components/Layout';

const ContactPage = () => {
	return <div>Contact</div>;
};

export default ContactPage;

ContactPage.getLayout = function getLayout(ContactPage) {
	return <Layout>{ContactPage}</Layout>;
};

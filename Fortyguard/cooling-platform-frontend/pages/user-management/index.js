import React from 'react';
import Layout from '../../components/Layout';
import UserManagement from '../../components/UserManagement';

const UserManagemnetPage = () => {
	return (
		<div>
			<UserManagement />
		</div>
	);
};

export default UserManagemnetPage;

UserManagemnetPage.getLayout = function getLayout(CreateUserPage) {
	return <Layout>{CreateUserPage}</Layout>;
};

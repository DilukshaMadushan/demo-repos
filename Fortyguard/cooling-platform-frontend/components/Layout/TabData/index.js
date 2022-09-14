//react-icons
import { HiHome } from 'react-icons/hi';
import { HiTemplate } from 'react-icons/hi';
import { HiCloudUpload } from 'react-icons/hi';
import { RiFolderUploadFill } from 'react-icons/ri';
import { HiViewGridAdd } from 'react-icons/hi';
import { HiStatusOnline } from 'react-icons/hi';
import { MdManageAccounts } from 'react-icons/md';
import { HiInformationCircle } from 'react-icons/hi';
import { MdPermContactCalendar } from 'react-icons/md';

//side navigation bar elements,details
export const TabData = [
	{
		id: '1',
		title: 'Home',
		icon: <HiHome />,
		path: '/',
	},
	{
		id: '2',
		title: 'Uploads',
		icon: <RiFolderUploadFill />,
		path: '/uploads',
	},
	{
		id: '3',
		title: 'Sensor',
		icon: <HiStatusOnline />,
		path: '/sensor',
	},
	{
		id: '4',
		title: 'User Management',
		icon: <MdManageAccounts />,
		path: '/user-management',
	},
	{
		id: '5',
		title: 'About Us',
		icon: <HiInformationCircle />,
		path: '/about-us',
	},
	{
		id: '6',
		title: 'Contact',
		icon: <MdPermContactCalendar />,
		path: '/contact',
	},
];

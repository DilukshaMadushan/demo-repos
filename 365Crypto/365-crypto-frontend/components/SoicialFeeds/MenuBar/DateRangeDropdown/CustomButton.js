import styles from './CustomButton.module.css';
import { IoCaretDown } from 'react-icons/io5';
import { BiCalendar } from 'react-icons/bi';

const CustomButton = ({ onClick, value }) => {
	return (
		<div className={`${styles.mainDiv}`}>
			<div className={`${styles.dropdown}`}>
				<div className={`${styles.dropdownBtn}`} onClick={onClick}>
					<span className={`${styles.titleSpan}`}>
						{value === '' ? 'Date Range' : value}
					</span>
					<span className={`${styles.arrowSpan}`}>
						<IoCaretDown />
					</span>
				</div>
			</div>
		</div>
	);
};

export default CustomButton;

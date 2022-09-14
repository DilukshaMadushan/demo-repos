import React, { useEffect, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { makeStyles } from '@material-ui/core/styles';
import Autosuggest from 'react-autosuggest';
import { defaultTheme } from 'react-autosuggest/dist/theme';
import styles from './index.module.css';
// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { webSocketParams0 } from '../../../../actions/Websocket';
import { getCoinData } from '../../../../actions/SpotGraphData';

// SET ENVIRONMENT BASE URL
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const useStyles = makeStyles((theme) => ({
	react_autosuggest__suggestions_container__open: {
		display: 'grid',
		position: 'absolute',
		top: '51px',
		width: '73%',
		zIndex: '1000',
	},
	react_autosuggest__suggestions_list: {
		backgroundColor: '#15141b',
		display: 'grid',
		justifyContent: 'center',
		padding: '0px',
		listStyleType: 'none',
		border: '1px solid rgba(255, 255, 255, 0.5)',
		width: '100%',
		borderRadius: '8px',
	},
	react_autosuggest__suggestion: {
		cursor: 'pointer',
		padding: '2px',
		color: '#fff',
		width: '100%',
	},
	react_autosuggest__suggestion__highlighted: {
		borderRadius: '20px',
		backgroundColor: '#232327',
	},
}));

const GithubMostPopularList = ({
	coin: { coinList },
	webSocketParams0,
	getCoinData,
}) => {
	const classes = useStyles();
	const [value, setValue] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [coinData, setCoinData] = useState({
		allCoin: [],
	});

	useEffect(() => {
		setCoinData({
			...coinData,
			allCoin: coinList && coinList.map((item) => item),
		});
	}, [coinList]);

	const getSuggestions = (value) => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		return inputLength === 0
			? []
			: coinData.allCoin.filter(
					(item) =>
						item.symbol.toLowerCase().slice(0, inputLength) === inputValue ||
						item.name.toLowerCase().slice(0, inputLength) === inputValue
			  );
	};

	const getSuggestionValue = (suggestion) => {
		webSocketParams0('spot', suggestion.symbol);
		getCoinData(suggestion._id);
		return suggestion.name;
	};

	const renderSuggestion = (suggestion) => (
		<div className={`${styles['dropdownItemDiv']}`}>
			<img
				className={`${styles['toglle-btn']}`}
				src={IMAGE_BASE_URL + suggestion.image}
			/>
			{suggestion.symbol}
		</div>
	);

	const onChange = (event, { newValue }) => {
		setValue(newValue);
	};

	const onSuggestionsFetchRequested = ({ value }) => {
		setSuggestions(getSuggestions(value));
	};

	const onSuggestionsClearRequested = () => {
		setSuggestions([]);
	};

	const inputProps = {
		placeholder: 'Search',
		value,
		onChange: onChange,
	};

	const renderInputComponent = (inputProps) => (
		<div>
			<input {...inputProps} className={`${styles['input-div']}`} />
		</div>
	);

	return (
		<div className={`${styles['main-div']}`}>
			<div className={`${styles['icon-div']}`}>
				<HiOutlineSearch size='18px' />
			</div>
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={onSuggestionsFetchRequested}
				onSuggestionsClearRequested={onSuggestionsClearRequested}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				renderInputComponent={renderInputComponent}
				inputProps={inputProps}
				theme={{
					...defaultTheme,
					suggestionsContainerOpen:
						classes.react_autosuggest__suggestions_container__open,
					suggestionsList: classes.react_autosuggest__suggestions_list,
					suggestion: classes.react_autosuggest__suggestion,
					suggestionHighlighted:
						classes.react_autosuggest__suggestion__highlighted,
				}}
			/>
		</div>
	);
};

GithubMostPopularList.propTypes = {
	coin: PropTypes.object.isRequired,
	webSocketParams0: PropTypes.func.isRequired,
	getCoinData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	coin: state.coin,
});
export default connect(mapStateToProps, { webSocketParams0, getCoinData })(
	GithubMostPopularList
);

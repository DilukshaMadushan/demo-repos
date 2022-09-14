import React, { useState, useEffect } from 'react';
import dark from './dark.module.css';
import light from './light.module.css';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { CSVReader } from 'react-papaparse';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { setAlert } from '../../../actions/Alert';
import Spinner from 'react-bootstrap/Spinner';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadCSV } from '../../../actions/Uploads';

const UploadsSection = ({
	common: { darkThemeState },
	uploads: { loading },
	uploadCSV,
}) => {
	const [uploadedFileArray, setUploadedFileArray] = useState(null);

	//File Upload Function
	const handleOnDrop = async (data) => {
		let dataArray = data.map((item) => item.data);
		let changedArray = [];
		let csvHeaders = [];

		try {
			for (let i = 0; i < dataArray.length - 1; i++) {
				var elementObject = dataArray[i];
				var changedArrayObject = {};

				if (i === 0) {
					dataArray[i].map((item) => {
						csvHeaders.push(item);
					});
				} else {
					for (let j = 0; j < elementObject.length; j++) {
						let element;

						if (
							elementObject[j] !== '' ||
							elementObject[j] !== 'NaN' ||
							elementObject[j] !== undefined
						) {
							element = await elementObject[j].replace(/\n/, '');
						} else {
							element = null;
						}
						changedArrayObject[csvHeaders[j]] = element;
					}
					changedArray.push(changedArrayObject);
				}
			}
			setUploadedFileArray(changedArray);
		} catch (error) {
			console.log(error);
			setAlert(error, 'error');
		}
	};

	const handleOnError = (err, file, inputElem, reason) => {
		console.log(err);
		setAlert('File uploading error!!!', 'error');
	};

	const handleOnRemoveFile = async () => {
		setAlert('File removed!!!.', 'warning');
		setUploadedFileArray(null);
	};

	//File Send Function
	const fileSend = () => {
		if (uploadedFileArray !== null) {
			// console.log(uploadedFileArray);
			uploadCSV(uploadedFileArray);
		} else {
			setAlert('Please uplaod a CSV file', 'error');
		}
	};

	return (
		<div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
			<CSVReader
				onDrop={handleOnDrop}
				onError={handleOnError}
				addRemoveButton
				onRemoveFile={handleOnRemoveFile}
				className={darkThemeState ? dark.box : light.box}
			>
				<div className={darkThemeState ? dark.box : light.box}>
					<div className={darkThemeState ? dark.icon : light.icon}>
						<FaCloudUploadAlt />
					</div>
					<div className={darkThemeState ? dark.textDrag : light.textDrag}>
						Drag and drop a CSV file here
					</div>
					<div className={darkThemeState ? dark.textOr : light.textOr}>or</div>
					<div className={darkThemeState ? dark.browseBtn : light.browseBtn}>
						Browse
					</div>
				</div>
			</CSVReader>
			<div className={darkThemeState ? dark.lowerDiv : light.lowerDiv}>
				<div
					onClick={() => fileSend()}
					className={darkThemeState ? dark.uploadBtn : light.uploadBtn}
				>
					Upload
				</div>
			</div>
		</div>
	);
};

UploadsSection.propTypes = {};

const mapStateToProps = (state) => ({
	common: state.common,
	uploads: state.uploads,
});

export default connect(mapStateToProps, {})(UploadsSection);

import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import { CSVReader } from 'react-papaparse';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { setAlert } from '../../../actions/Alert';
import Spinner from 'react-bootstrap/Spinner';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadCSV } from '../../../actions/Uploads';

const Uploads = ({
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
		<div className={`${styles['mainDiv']}`}>
			<div>Uploads</div>
			<br />
			<div
				className={darkThemeState ? styles['subDiv'] : styles['subDivLight']}
			>
				{!loading ? (
					<div style={{ height: '100%', width: '100%' }}>
						<CSVReader
							onDrop={handleOnDrop}
							onError={handleOnError}
							addRemoveButton
							onRemoveFile={handleOnRemoveFile}
						>
							<span>
								<text color={darkThemeState ? '#181f36' : '#eaeaea'}>
									Drop CSV file here or click to upload.
								</text>
							</span>
						</CSVReader>
					</div>
				) : (
					<Spinner animation='border' variant='success' />
				)}

				{!loading && (
					<div className={`${styles['uploadBtn']}`} onClick={() => fileSend()}>
						<AiOutlineCloudUpload
							style={
								darkThemeState
									? {
											height: '70px',
											width: '70px',
											borderRadius: '100%',
											position: 'absolute',
											right: '80px',
											bottom: '68px',
											backgroundColor: '#eaeaea',
											color: '#181f36',
											padding: '10px',
									  }
									: {
											height: '70px',
											width: '70px',
											borderRadius: '100%',
											position: 'absolute',
											right: '80px',
											bottom: '68px',
											backgroundColor: '#181f36',
											color: '#eaeaea',
											padding: '10px',
									  }
							}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

Uploads.propTypes = {
	uploadCSV: PropTypes.func.isRequired,
	uploads: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	uploads: state.uploads,
	common: state.common,
});

export default connect(mapStateToProps, { uploadCSV })(Uploads);

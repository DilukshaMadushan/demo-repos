import React, { useRef, useEffect, useState } from 'react';
import dark from './dark.module.css';
import light from './light.module.css';
import mapboxgl from '!mapbox-gl';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Mapbox token
mapboxgl.accessToken =
	'pk.eyJ1IjoiYW5kcmVsaXZ5IiwiYSI6ImNrdmtqMmh4dTBxeGwycW4xbWNhemJlNWsifQ.1MNWkNAY7IE32ZDYt7b5sw';

const GeolocationBox = ({ common: { darkThemeState } }) => {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(-70.9);
	const [lat, setLat] = useState(42.35);
	const [zoom, setZoom] = useState(9);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom,
			attributionControl: false,
		});
	});

	return (
		<div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
			<div ref={mapContainer} className='map-container' />
		</div>
	);
};

GeolocationBox.propTypes = {};

const mapStateToProps = (state) => ({
	common: state.common,
});
export default connect(mapStateToProps, {})(GeolocationBox);

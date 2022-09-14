import React, { useState, createContext } from 'react';

export const DivContext = createContext();

export const DivProvider = (props) => {
	const [divState, setDivState] = useState('1');

	return (
		<DivContext.Provider value={[divState, setDivState]}>
			{props.children}
		</DivContext.Provider>
	);
};

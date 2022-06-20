import React, { useMemo } from 'react'
import { sizes } from '../services/api';

const Options = ({type, list, choosen, onSelect}) => {
	const allAvailableSizes = useMemo(() => {
		return list.map(size => {
			const data = sizes.find(dataSize => {
				return size === dataSize.id
			});

			return data?.label
		})
	}, [list]);

	const data = type === 'size' ? allAvailableSizes : list;

    return (
		data.map((item, idx) => {
			return (
				<span key={idx}
					  onClick={() => {onSelect(type, item)}}
					  className={choosen === item ? 'selected' : ''}>
					{item}
				</span>
			)
		})

	)
};


export default Options;

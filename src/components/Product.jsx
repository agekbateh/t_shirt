import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Back from './Back'
import Options from './Options'
import { getProducts, sizes } from '../services/api'

const Product = () => {
	const { id } = useParams();
	const [data, setData] = useState({});
	const [selected, setSelected] = useState(null);
	const [searched, setSearched] = useState(false);


	useEffect(async () => {
		const list = await getProducts();

		// шукаєм товар з відповідним id
		const item = list.find(item => {
			return (item.id).toString() === id
		});
		item && setData(item);

		//  робим його вибраним
		if (item) {
			const selected = {...item.colors.find(color => color.sizes.length)};
			selected.color = selected.name
			selected.size = sizes.find(size => size.id = selected.sizes[0]).label

			selected && setSelected(selected)
		}

		setSearched(true); // флаг про отримання данних
	}, []);

	const onSelectSize = (opt, value) => {
		const updSelected = {...selected};
		updSelected[opt] = value;

		setSelected(updSelected);
	};

	const onSelectColor = (opt, value) => {
		const updSelected = data.colors.find(item => item.name === value);
		updSelected[opt] = value;

		setSelected(updSelected);
	}

	// товар не знайдено
	if (searched && !data.id || searched && !selected) {
		return <div className={"product-container"}>
			<Back />
			вибачте такого товару немає
		</div>
	}

	const isPages = location.origin.endsWith('github.io')

	const publicPath = isPages ? 'https://agekbateh.github.io/t_shirt/build' : '';

    return (

		<div className={"product-container"}>
			<Back />

			{searched &&
				<>
					<div className={'product'}>
						<div className="product-img">
							<img src={publicPath + selected.images[0]} alt=""/>
						</div>
					</div>

					<div className="product-selector">
						Колір: <Options
						type={'color'}
						onSelect={onSelectColor}
						list={data.colors.map(color => color.name)}
						choosen={selected.color}/>
					</div>

					<div className="product-selector">
						Розмір: <Options
						type={'size'}
						onSelect={onSelectSize}
						list={selected.sizes}
						choosen={selected.size}/>
					</div>


					<div className={'product-choice'}>
						{`Ваш вибір: ${data.name} ${selected.color ? selected.color : ''} ${selected.size ? selected.size : ''} `}
					</div>
				</>
			}
		</div>
    );
};



export default Product;

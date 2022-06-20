import React, { useEffect, useState } from 'react'
import { getProducts } from '../services/api'
import {Link} from 'react-router-dom'

const List = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		getProducts().then(data => {
			setProducts(data);
		})
	}, [])

    return (
		<div className={'catalog'}>
			{!!products.length &&
				<div className={"list"}>
					<ul className="list-inner">
						{products.map(item => {

							return (
								<li className={"list-item"} key={item.id}>
									<Link to={`/product/${item.id}`}>
										<img src={process.env.PUBLIC_URL + item.colors[0].images[0]} alt=""/>
										<span>{item.name}</span>
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
			}
		</div>
    );
};

export default List;

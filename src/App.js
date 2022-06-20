import React from 'react'
import {
	BrowserRouter,
	Route,
	Switch,
} from 'react-router-dom'

import Header from './components/Header'
import Product from './components/Product'
import List from './components/List'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="App">
		<BrowserRouter basename={location.pathname}>
			<Route component={Header}/>
			<Switch>
				<Route path={'/product/:id'} component={Product}/>
				<Route path={'/'} component={List}/>
			</Switch>
			<Route component={Footer} />
		</BrowserRouter>
    </div>
  )
}

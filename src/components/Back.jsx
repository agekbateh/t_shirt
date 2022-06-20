import React from 'react';
import { withRouter } from 'react-router-dom'

const Back = (props) => {
	const { history } = props;

	const goBack = () => {
		history.goBack();
	}

    return (
        <div className={"back"}>
			<span onClick={goBack} >{'<- назад'}</span>
		</div>
    );
};


export default withRouter(Back);

import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {authAPI} from "../../API/api";
import {getAuthUserData, logout, setAuthUserData} from "../../redux/auth-reducer";





class HeaderContainer extends React.Component {


	componentDidMount() {

		this.props.getAuthUserData();
		/*authAPI.getAuthData()
			.then(data => {
				if (data.resultCode === 0) {
					let {id, email, login} = data.data;
					this.props.setAuthUserData(id, email, login, true)
				}

			})*/
	}


	render() {
		return <Header {...this.props} />
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth,
		login: state.auth.login,
	}

}


export default connect(mapStateToProps, {setAuthUserData, getAuthUserData, logout})(HeaderContainer);
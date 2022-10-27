import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {getStatus, getUserProfile, savePhoto, saveProfile, setProfile, updateStatus} from "../../redux/profile-reducer";
import {profileAPI} from "../../API/api";
import {useLocation, useNavigate, useParams, Navigate} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";



export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                match={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}



class ProfileContainer extends React.Component {

    refreshProfile () {

        let userId = this.props.match.params.userId;

        if (!userId) {
            userId = this.props.id;
            if(!userId) {
                this.props.match.navigate('/login')
            }
        }

        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }


    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }


    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} updateStatus={this.props.updateStatus} status={this.props.status}
            isOwner={!this.props.match.params.userId}/>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
        id: state.auth.id,

    }
}



export default compose(
    connect(mapStateToProps, {setProfile, getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter)
(ProfileContainer)

/*
withAuthRedirect(connect(mapStateToProps, {setProfile})(withRouter(ProfileContainer)));*/

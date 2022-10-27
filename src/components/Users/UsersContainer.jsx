import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {
    follow,
    followSuccess, getUserTh,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching, toggleIsFollowingProgress, unfollow,
    unfollowSuccess
} from "../../redux/users-reducer";
import {usersAPI} from "../../API/api";
import Preloader from "../../Common/Preloader/Preloader";


class UsersAPIContainer extends React.Component {






    componentDidMount() {
        /*if (this.props.users.length === 0) {
            this.props.toggleIsFetching(true)
            usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
                .then(data => {
                    /!*debugger*!/
                    this.props.toggleIsFetching(false)
                    this.props.setUsers(data.items);
                    this.props.setTotalUsersCount(data.totalCount)

                })
        }*/
        if (this.props.users.length === 0 ) {
            this.props.getUserTh(this.props.currentPage, this.props.pageSize)
        }

    }



    onPageChanged = (numberOfPage) => {
        /*this.props.toggleIsFetching(true)
        this.props.setCurrentPage(numberOfPage);
        usersAPI.getUsers(numberOfPage, this.props.pageSize)
            .then(data => {
                /!*debugger*!/
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items);


            })*/
        this.props.getUserTh(numberOfPage, this.props.pageSize)
    }



    render() {

        return (
            <>
                {this.props.isFetching ?
                <Preloader />
                : <Users {...this.props} onPageChanged={this.onPageChanged}
                         unfollow={this.props.unfollow}
                         follow={this.props.follow}/>
                }

            </>

        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUserCount: state.usersPage.totalUserCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,

    }
}


const UsersContainer = connect(mapStateToProps, {followSuccess, unfollowSuccess, setUsers,
    setTotalUsersCount, setCurrentPage, toggleIsFetching, toggleIsFollowingProgress, getUserTh, follow, unfollow})(UsersAPIContainer)

export default UsersContainer;
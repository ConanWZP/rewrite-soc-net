import React from 'react';
import {connect} from "react-redux";
import MyPosts from "./MyPosts";
import {addPost, changeTextOfPost, deletePost} from "../../../redux/profile-reducer";


const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.postsData,
        constText: state.profilePage.constText,
    }
}
const MyPostsContainer = connect(mapStateToProps, {addPost, changeTextOfPost, deletePost})(MyPosts)

export default MyPostsContainer;
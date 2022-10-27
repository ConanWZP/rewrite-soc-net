import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../Common/FormsControls/FormsControls";
import {addPost, changeTextOfPost} from "../../../redux/profile-reducer";




const MyPosts = React.memo((props) => {

    const postsElements = props.posts.map(post => {
        return (
            <Post message={post.message} likes={post.like} id={post.userId} deletePost={props.deletePost} />
        )
    });

    /*const addNewPost = (value) => {
        props.addPost(value.postText);
        value.postText = '';
    }*/

    const newPostText = React.createRef();

    const addPost = () => {
        let text = props.constText;
        props.addPost(text);
    }

    const onChangeText = () => {
        let text = newPostText.current.value;
        props.changeTextOfPost(text);
    }


    return (
        <div className={styles.postsBlock} >
            <h2>My posts</h2>
            New Posts
            {/*<MyPostReduxForm onSubmit={addNewPost} />*/}
            <div>
                {/*<Field name={'postText'} component={'textarea'} placeholder={'Текст поста'} />*/}
                <textarea ref={newPostText} value={props.constText} onChange={onChangeText} />
            </div>
            <div>
                <button onClick={addPost}>Add post</button>
            </div>
            <div>
                {postsElements}
            </div>
        </div>
    )
})

/*
const MyPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'postText'} component={'textarea'} placeholder={'Текст поста'} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>

    );
}
*/



/*export const MyPostReduxForm = reduxForm({

    form: 'submitPost'
})(MyPostForm)*/

export default MyPosts;

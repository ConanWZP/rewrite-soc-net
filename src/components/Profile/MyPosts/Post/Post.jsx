import React from 'react';
import style from './Post.module.css';

const Post = (props) => {
  return (
    <div className={style.item}>
        <img src="https://proprikol.ru/wp-content/uploads/2020/10/kartinki-nochnogo-goroda-2.jpeg" alt="" />
        {props.message}
          <div>
        <span>Лайки: {props.likes}</span>
              <button onClick={()=> {props.deletePost(props.id)}}>Delete post</button>
      </div>
    </div>
  )

}

export default Post;
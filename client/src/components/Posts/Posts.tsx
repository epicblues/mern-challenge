import React, { FunctionComponent } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './style'

const Posts: FunctionComponent = () => {
  const classes = useStyles();
  const posts = useSelector((state: RootStateOrAny) => state.posts)

  console.log(posts);

  return (
    <>
      <h1>
        POSTS
      </h1>
      <Post />
      <Post />
    </>
  )
}

export default Posts

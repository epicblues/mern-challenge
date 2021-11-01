import React, { FunctionComponent } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './style'
import { Grid, CircularProgress } from '@material-ui/core';
import { PostVo } from '../../model';

const Posts: FunctionComponent = () => {
  const classes = useStyles();
  const posts = useSelector((state: RootStateOrAny) => state.posts)

  console.log(posts);

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
        {posts.map((post: PostVo) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} />
          </Grid>

        )
        )}
      </Grid>
    )
  )
}

export default Posts

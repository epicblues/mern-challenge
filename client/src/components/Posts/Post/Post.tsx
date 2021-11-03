import React, { FunctionComponent, useEffect, useState } from 'react'
import { PostVo } from '../../../model'
import useStyles from './style'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'



const Post: FunctionComponent<{ post: PostVo, setCurrentId: Function }> = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isValidUser, setIsValidUser] = useState(false);
  const profile = localStorage.getItem('profile');
  const user = JSON.parse(profile as string)?.result;
  // const auth = useSelector((state: RootStateOrAny) => state.auth);
  useEffect(() => {
    console.log("post effect activated")
    if (profile) {
      const { result: { _id, googleId } } = JSON.parse(profile);

      const id = _id || googleId;
      setIsValidUser(id === post.creator);
    } else {
      setIsValidUser(false);
    }
  }, [profile])

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        {isValidUser &&
          <Button
            style={{ color: 'white' }}
            size="small"
            onClick={() => { setCurrentId(post._id) }}>
            <MoreHorizIcon fontSize="medium" />
          </Button>
        }



      </div>
      <div className={classes.details}>
        <Typography variant='body2' color="textSecondary">{post.tags?.map(tag => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button disabled={!profile} size="small" color="primary" onClick={() => { dispatch(likePost(post._id as string)) }}>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; {post.likes?.indexOf(user?._id || user?.googleId) === -1 ? 'Like' : 'You Liked It'} &nbsp;
          {post.likes?.length}
        </Button>
        {isValidUser &&
          <Button size="small" color="primary" onClick={() => { dispatch(deletePost(post._id as string)) }}>
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        }

      </CardActions>

    </Card>
  )
}

export default Post

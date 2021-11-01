import React, { ChangeEventHandler, FormEventHandler, FunctionComponent, MouseEventHandler, useEffect, useState } from 'react'
import useStyles from './style'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';


// Get the current ID of form

export type PostType = {
  _id?: string
  title?: string,
  message?: string,
  creator?: string,
  tags?: string[],
  selectedFile?: string,
  likeCount?: number,
  createdAt?: Date
}

const Form: FunctionComponent<{ currentId: string | null, setCurrentId: Function }> = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const selectedPost = useSelector((state: RootStateOrAny) => currentId ? state.posts.find((post: PostType) => post._id === currentId) : null)
  // redux의 data을 fetch한다.
  const [postData, setPostData] = useState<PostType>({
    creator: '',
    title: '',
    tags: [],
    selectedFile: '',
    message: ''
  });

  useEffect(() => {
    if (selectedPost) {
      setPostData(selectedPost)
    }
    return () => {

    }
  }, [selectedPost])

  const classes = useStyles();
  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData))
    } else {
      dispatch(createPost(postData));
    }
    clear()

  }
  const clear = () => {
    setPostData({
      creator: '',
      title: '',
      tags: [],
      selectedFile: '',
      message: ''
    })
    setCurrentId(null);
  }

  return (
    <Paper className={classes.paper}>
      <form action="" autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Updating' : 'Creating'} a Memory</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) => {
            setPostData({ ...postData, creator: e.target.value })
          }}
        />
        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={(e) => {
            setPostData({ ...postData, title: e.target.value })
          }}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) => {
            setPostData({ ...postData, message: e.target.value })
          }}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => {
            setPostData({ ...postData, tags: e.target.value.split(', ') })
          }}
        />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false}
            onDone={({ base64 }: { base64: string }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form

import React, { ChangeEventHandler, FormEventHandler, FunctionComponent, MouseEventHandler, useState } from 'react'
import useStyles from './style'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../actions/posts';


// Get the current ID of form

export type PostType = {
  title?: String,
  message?: String,
  creator?: String,
  tags?: string[],
  selectedFile?: String,
  likeCount?: Number,
  createdAt?: Date
}

const Form: FunctionComponent<{ currentId: string | null }> = ({ currentId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootStateOrAny) => state.posts)
  const [postData, setPostData] = useState<PostType>({
    creator: '',
    title: '',
    tags: [],
    selectedFile: '',
    message: ''
  });
  const classes = useStyles();
  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    dispatch(createPost(postData));

  }
  const clear: MouseEventHandler = () => {
    setPostData({
      creator: '',
      title: '',
      tags: [],
      selectedFile: '',
      message: ''
    })
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
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }}
        />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false}
            onDone={({ base64 }: { base64: String }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form

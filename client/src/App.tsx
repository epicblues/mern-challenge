import React, { FunctionComponent, useEffect } from 'react'
import { AppBar, Container, Typography, Grid, Grow } from '@material-ui/core'
import memories from './images/memories.png'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import useStyles from './styles'
import { useDispatch } from 'react-redux' // Action을  Dispatch 해주는 react-redux 함수
import { getPosts } from './actions/posts'


const App: FunctionComponent = () => {
  // useStyles 사용자 정의 스타일 훅(Mapping 해준다.)
  const classes = useStyles();
  const dispatch = useDispatch(); // 훅에서 정의된 함수를 action으로 보낸다. hooks의 경우 useEffect에서 사용
  useEffect(() => {
    console.log('App Component Rendered');
    dispatch(getPosts())
    return () => {

    }
  }, [dispatch]) // dispatch된 action에 의해 store의 값이 바뀌면 Function Component를 한 번 더 실행하는 것 같다? 

  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img src={memories} alt="memories" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App

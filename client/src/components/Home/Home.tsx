import React, { FunctionComponent, useEffect, useState } from 'react'
import { Container, Grid, Grow, } from '@material-ui/core'
import Posts from '../../components/Posts/Posts'
import Form from '../../components/Form/Form'
import useStyles from './styles'
import { getPosts } from '../../actions/posts'
import { useDispatch } from 'react-redux'

const Home: FunctionComponent = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  // useStyles 사용자 정의 스타일 훅(Mapping 해준다.)

  const dispatch = useDispatch(); // 훅에서 정의된 함수를 action으로 보낸다. hooks의 경우 useEffect에서 사용
  useEffect(() => {
    console.log('App Component Rendered');
    dispatch(getPosts())
    // getPosts  비동기 Action으로 post 배열을 전부 받아와서 state를 변경시킨다.
    return () => {

    }
  }, [dispatch, currentId])
  return (
    <Grow in>
      <Container>
        <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home

import React, { useState, useEffect } from 'react'
import memories from '../../images/memories.png';
import useStyles from './styles';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import jwtDecode from 'jwt-decode';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile') as string));
  const state = useSelector((state: RootStateOrAny) => state);
  const dispatch = useDispatch()
  const history = useHistory()

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push('/');
    setUser(null);
  }
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode<any>(token);
      if (decodedToken?.exp * 1000 < new Date().getTime()) {
        // 토큰 만료 기간이 현재 시간보다 낮을 경우 -> 만료됐으므로 자동 로그아웃. 
        // 로그아웃 하지 않을 경우 서버에서 만료된 토큰에 따라 요청을 거절하므로 오류가 난다.
        logout();
      }
    }
    // JWT Check

    setUser(JSON.parse(localStorage.getItem('profile') as string));
  }, [state])
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
              children={user?.result.name.charAt(0)} />
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

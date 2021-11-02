import React, { FormEventHandler, useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import Icon from './Icon';
import { env } from 'process';
import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes';
import { useHistory } from 'react-router';


const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  // react-router 용 redirect
  const handleSubmit: FormEventHandler = () => {

  }
  const handleChange = () => {

  }

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    // setState로 state 값을 바꿀 때는 이전 state를 매개변수로 받는 콜백 함수를 작성해야 한다.
  }

  const switchMode = () => {
    setIsSignup((prevIsSignUp) => !prevIsSignUp);
  }

  const googleSuccess = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    // ? 연산자 : res가 없어도 cannot read undefined error를 뜨게 하지 않는 연산자
    const { profileObj: result, tokenId: token } = res as GoogleLoginResponse;
    history.push('/');
    try {
      dispatch({ type: AUTH, data: { result, token } })
      // Action을 거치지 않고 직접 dispatch(서버와 소통할 이유가 없기 때문에?)
    } catch (error) {
      console.log(error);
    }



  }

  const googleFailure = (error: any) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half />
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color='primary'
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )
            }
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign In' : "Don't have and account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth

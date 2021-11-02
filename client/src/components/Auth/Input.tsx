import React, { EventHandler, FunctionComponent } from 'react'
import { TextField, Grid, InputAdornment, IconButton, OutlinedInputProps, InputProps } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

interface Props {
  half?: boolean,
  name: string,
  label: string,
  handleChange: EventHandler<React.SyntheticEvent>,
  type?: string,
  autoFocus?: boolean,
  handleShowPassword?: Function
}


const Input: FunctionComponent<Props> = ({ type, half, name, label, handleChange, autoFocus, handleShowPassword }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        fullWidth
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={name === 'password' ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => { if (handleShowPassword) handleShowPassword() }}>
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        } as Partial<InputProps> : undefined}
      />
    </Grid>
  )
}

export default Input

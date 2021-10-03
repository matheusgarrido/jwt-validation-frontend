import React from 'react';
import GridAccess from './GridAccess';
import Style from './Access.module.scss';
import { changeTitle } from '../../helpers/modifyHtmlHead';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import useLogin from './useLogin';

const Login = () => {
  changeTitle('Login');
  const { data, error, handle, getValue } = useLogin();
  return (
    <GridAccess title="Login">
      <form onSubmit={handle.submit}>
        <TextField
          error={!!error.email || !!error.all}
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          helperText={error.email}
          value={data.email}
          onInput={handle.input}
          onBlur={handle.blur}
          className={Style['card__input']}
          required
        />
        <TextField
          error={!!error.password || !!error.all}
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          helperText={error.password}
          value={data.password}
          onInput={handle.input}
          onBlur={handle.blur}
          className={Style['card__input']}
          required
        />
        {getValue.hasError() && (
          <Typography
            className={`${Style['card__message']} ${Style['card__message--error']}`}
          >
            {error.all || getValue.hasError()}
          </Typography>
        )}
        <Button
          variant="contained"
          disabled={getValue.disabledButton()}
          type="submit"
          className={Style['card__button']}
        >
          Login
        </Button>
      </form>
      <hr />
      <div className={Style['card__submenu']}>
        <Typography>Not registered yet?</Typography>
        <Typography>
          <Link to="/register">Create your account</Link>
        </Typography>
      </div>
    </GridAccess>
  );
};

export default Login;

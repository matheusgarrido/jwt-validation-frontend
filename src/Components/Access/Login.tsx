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
          onInput={handle.email}
          className={Style.card__input}
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
          onInput={handle.password}
          className={Style.card__input}
          required
        />
        <p>{error.all}</p>
        <Button
          variant="contained"
          disabled={getValue.disabledButton()}
          type="submit"
          className={Style.card__button}
        >
          Login
        </Button>
        <div className={Style.card__message}>
          <Typography>Not registered yet?</Typography>
          <Link to="/acesso/cadastro">
            <Typography>Create your account</Typography>
          </Link>
        </div>
      </form>
    </GridAccess>
  );
};

export default Login;

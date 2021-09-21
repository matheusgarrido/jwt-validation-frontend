import React from 'react';
import GridAccess from './GridAccess';
import Style from './Access.module.scss';
import { changeTitle } from '../../helpers/modifyHtmlHead';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import useLogin from './useLogin';

const Login = () => {
  changeTitle('Login');
  const { data, error, handle } = useLogin();
  return (
    <GridAccess title="Login">
      <form onSubmit={handle.submit}>
        <TextField
          error={!!error.email}
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
          error={!!error.password}
          id="password"
          label="Senha"
          type="password"
          variant="outlined"
          helperText={error.password}
          value={data.password}
          onInput={handle.password}
          className={Style.card__input}
          required
        />
        <Button
          variant="contained"
          disabled={!data.email || !data.password}
          type="submit"
          className={Style.card__button}
        >
          Login
        </Button>
        <div className={Style.card__message}>
          <Typography>Ainda não é cadastrado?</Typography>
          <Link to="/acesso/cadastro">
            <Typography>Crie sua conta</Typography>
          </Link>
        </div>
      </form>
    </GridAccess>
  );
};

export default Login;

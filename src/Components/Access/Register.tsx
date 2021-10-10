import React from 'react';
import GridAccess from './GridAccess';
import Style from './Access.module.scss';
import { changeTitle } from '../../helpers/modifyHtmlHead';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import useAccess from './useAccess';
import {
  IRegisterValues,
  IRegisterErrorList,
  IRegisterField,
} from './interfaces';

const defaultValues: IRegisterValues = {
  email: '',
  password: '',
  role: '',
  username: '',
  birth: new Date(),
};
const defaultErrors: IRegisterErrorList = {
  all: '',
  email: '',
  password: '',
  role: '',
  username: '',
  birth: '',
};

const Register = () => {
  changeTitle('Register');
  const { data, error, handle, getValue } = useAccess<
    IRegisterField,
    IRegisterValues,
    IRegisterErrorList
  >('register', defaultValues, defaultErrors);
  return (
    <GridAccess title="Register">
      <form onSubmit={handle.submit}>
        {/* <form> */}
        <TextField
          error={!!error.email || !!error.all}
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          onInput={handle.input}
          helperText={error.email}
          value={data.email}
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
          onInput={handle.input}
          helperText={error.password}
          value={data.password}
          onBlur={handle.blur}
          className={Style['card__input']}
          required
        />
        {getValue.hasError && (
          <Typography
            className={`${Style['card__message']} ${Style['card__message--error']}`}
          >
            {error.all || getValue.hasError}
          </Typography>
        )}
        <Button
          variant="contained"
          disabled={getValue.disabledButton}
          type="submit"
          className={Style['card__button']}
        >
          Sign up
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

export default Register;

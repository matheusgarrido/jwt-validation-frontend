import { FormEvent, useState } from 'react';
import axios from '../../api/axiosController';

interface IErrorList {
  all: string;
  email: string;
  password: string;
}
interface INewError {
  field: 'all' | 'email' | 'password';
  value: string;
}

export const useLogin = () => {
  //Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Errors
  const defaultError = {
    email: '',
    password: '',
    all: '',
  };
  const [error, setError] = useState<IErrorList>(defaultError);

  //Get an inputted value
  const inputField = (event: FormEvent) => {
    handle.error([{ field: 'all', value: '' }]);
    const { value } = event.target as HTMLInputElement;
    return value;
  };

  //Handle Form
  const handle = {
    //Change errors state
    error: (errors: INewError[]) => {
      const newError: IErrorList = { ...error };
      errors.map((err) => {
        newError[err.field] = err.value;
      });
      setError(newError);
    },
    //Form submit
    submit: async (event: FormEvent) => {
      event.preventDefault();
      const newUser = await axios.post({ email, password }, '/auth/login');
      if (newUser.data.error) {
        handle.error([{ field: 'all', value: newUser.data.error.message }]);
        return;
      }
      const { accessToken, refreshToken } = newUser.data;
    },
    //Change input values state
    email: (event: FormEvent) => {
      handle.error([{ field: 'email', value: '' }]);
      setEmail(inputField(event));
    },
    password: (event: FormEvent) => {
      handle.error([{ field: 'password', value: '' }]);
      setPassword(inputField(event));
    },
  };

  const getValue = {
    //Get boolean to disable submit button
    disabledButton: (): boolean => {
      return !email || !password;
    },
  };

  return {
    data: { email, password },
    error,
    handle,
    getValue,
  };
};

export default useLogin;

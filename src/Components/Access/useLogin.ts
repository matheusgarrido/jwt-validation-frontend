import { FormEvent, useState } from 'react';

export const useLogin = () => {
  //Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //Errors
  let error = { email: '', password: '' };

  //Handle Form
  const handle = {
    data: (event: FormEvent) => {
      const { value } = event.target as HTMLInputElement;
      return value;
    },
    submit: async (event: FormEvent) => {
      event.preventDefault();
    },
    email: (event: FormEvent) => {
      setEmail(handle.data(event));
    },
    password: (event: FormEvent) => {
      setPassword(handle.data(event));
    },
  };

  const getFunctions = {
    disabledButton: (): boolean => {
      return !email || !password;
    },
  };

  return {
    data: { email, password },
    error,
    handle,
    getValue: getFunctions,
  };
};

export default useLogin;

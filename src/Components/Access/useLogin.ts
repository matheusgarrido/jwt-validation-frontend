import { FormEvent, useState } from 'react';

const handleData = (event: FormEvent) => {
  const { value } = event.target as HTMLInputElement;
  return value;
};

export const useLogin = () => {
  //Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Errors
  let error = { email: '', password: '' };

  //Handle Form
  const handle = {
    submit: (event: FormEvent) => {
      event.preventDefault();
    },
    email: (event: FormEvent) => {
      setEmail(handleData(event));
    },
    password: (event: FormEvent) => {
      setPassword(handleData(event));
    },
  };

  return { data: { email, password }, error, handle };
};

export default useLogin;

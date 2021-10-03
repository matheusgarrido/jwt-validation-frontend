import { FormEvent, useState } from 'react';
import axios from '../../api/axiosController';
import { loginValidation } from '../../Models/Access.model';

interface IValues {
  email: string;
  password: string;
}
interface IErrorList {
  all: string;
  email: string;
  password: string;
}
type TField = 'email' | 'password';
interface INewError {
  field: 'all' | TField;
  value: string;
}

export const useLogin = () => {
  //Input states
  const defaultEmptyFields = { email: '', password: '' };
  const [inputValues, setInputValues] = useState<IValues>(defaultEmptyFields);
  //Errors
  const defaultError = { ...defaultEmptyFields, all: '' };
  const [error, setError] = useState<IErrorList>(defaultError);

  //Get an inputted value
  const inputField = (event: FormEvent) => {
    handle.error([{ field: 'all', value: '' }]);
    const { value } = event.target as HTMLInputElement;
    console.log(error);
    return value;
  };
  //Verify if has errors (invalid) or not (valid)
  const invalidateForm = () => {
    const { email, password } = inputValues;
    const invalid = loginValidation({ email, password });
    if (invalid) return invalid;
    return false;
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
      const { email, password } = inputValues;
      const newUser = await axios.post({ email, password }, '/auth/login');
      if (newUser.data.error) {
        handle.error([{ field: 'all', value: newUser.data.error.message }]);
        return;
      }
      const { accessToken, refreshToken } = newUser.data;
    },
    //Change input values state
    email: (event: FormEvent) => {
      setInputValues({ ...inputValues, email: inputField(event) });
    },
    password: (event: FormEvent) => {
      setInputValues({ ...inputValues, password: inputField(event) });
    },
  };

  const getValue = {
    //Get boolean to disable submit button
    disabledButton: (): boolean => {
      return !!invalidateForm();
    },
    //Verify if some field has an error
    hasError: (): string => {
      const hasError = Object.values(error).filter((err) => !!err).length;
      return !!hasError ? 'Please fill the form correctly' : '';
    },
  };

  return {
    data: inputValues,
    error,
    handle,
    getValue,
  };
};

export default useLogin;

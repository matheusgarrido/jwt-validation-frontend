import { FormEvent, useState } from 'react';
import axios from '../../api/axiosController';
import { loginValidation } from '../../Models/Access.model';
import { useAuthContext } from '../../Providers/Auth.provider';

interface IValues {
  email: string;
  password: string;
}
interface IErrorList {
  all: string;
  email: string;
  password: string;
}
type IField = 'email' | 'password';
interface INewError {
  field: 'all' | IField;
  value: string;
}

export const useLogin = () => {
  const AuthContext = useAuthContext();
  //Input states
  const defaultEmptyFields = { email: '', password: '' };
  const [inputValues, setInputValues] = useState<IValues>(defaultEmptyFields);
  //Errors
  const defaultError = { ...defaultEmptyFields, all: '' };
  const [error, setError] = useState<IErrorList>(defaultError);

  //Verify if has errors (invalid) or not (valid)
  const invalidateFields = (fields: Object) => {
    const invalid = loginValidation(fields);
    return invalid ? invalid : false;
  };
  //Verify if one field has error
  const invalidateGenericalObject = (field: IField, value: string) => {
    const fieldToBeValidated: any = {};
    fieldToBeValidated[field] = value;
    return invalidateFields(fieldToBeValidated);
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
      //Checking errors
      if (newUser.data.error) {
        handle.error([{ field: 'all', value: newUser.data.error.message }]);
        return;
      }
      //Saving tokens
      const { accessToken, refreshToken } = newUser.data;
      AuthContext.setTokens({ access: accessToken, refresh: refreshToken });
    },
    //Change input values state
    input: async (event: FormEvent) => {
      const { value, field } = getValue.inputFieldValues(event);
      const newInputValues = { ...inputValues };
      newInputValues[field] = value;
      setInputValues(newInputValues);
      const invalid = invalidateGenericalObject(field, value);
      if (!invalid) {
        handle.error([{ field, value: '' }]);
      }
    },
    // On blur (after the focus)
    blur: (event: FormEvent) => {
      const { field } = getValue.inputFieldValues(event);
      if (inputValues[field] || error[field]) {
        const invalid = invalidateGenericalObject(field, inputValues[field]);
        if (invalid) {
          handle.error([{ field, value: invalid[0].message }]);
          return;
        }
      }
      handle.error([{ field, value: '' }]);
    },
  };

  const getValue = {
    //Get some input field values
    inputFieldValues: (event: FormEvent): { value: string; field: IField } => {
      handle.error([{ field: 'all', value: '' }]);
      const target = event.target as HTMLInputElement;
      const field = target.id as IField;
      return { value: target.value, field };
    },
    //Get boolean to disable submit button
    disabledButton: (): boolean => {
      const { email, password } = inputValues;
      return !!invalidateFields({ email, password });
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

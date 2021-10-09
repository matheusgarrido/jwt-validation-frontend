import { FormEvent, useState } from 'react';
import axios from '../../api/axiosController';
import { loginValidation } from '../../Models/Access.model';
import { useAuthContext } from '../../Providers/Auth.provider';

type IAccessType = 'login' | 'register';
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
type IErrorField = IField | 'all';
interface INewError {
  field: IErrorField;
  value: string;
}

export const useAccess = (type: IAccessType = 'login') => {
  //Auth Context custom hook
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
  //Show a submit error
  const showError = (field: IErrorField, value: string) => {
    console.error(value);
    handle.error([{ field, value }]);
  };

  //Get some input field values
  const inputFieldValues = (
    event: FormEvent
  ): { value: string; field: IField } => {
    handle.error([{ field: 'all', value: '' }]);
    const target = event.target as HTMLInputElement;
    const field = target.id as IField;
    return { value: target.value, field };
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
      //If has error at connection with backend
      if (!newUser) {
        showError('all', 'An internal error has occurred, please try later');
        return;
      }
      //If has error in backend
      if (newUser.data.error) {
        return showError('all', newUser.data.error.message);
      }
      //Saving tokens
      const { accessToken, refreshToken } = newUser.data;
      AuthContext.setTokens({ access: accessToken, refresh: refreshToken });
    },
    //Change input values state
    input: async (event: FormEvent) => {
      const { value, field } = inputFieldValues(event);
      const newInputValues = { ...inputValues };
      newInputValues[field] = value;
      setInputValues(newInputValues);
      const invalid = invalidateGenericalObject(field, value);
      //Clean generic error
      const errorCleaner: INewError[] = [{ field: 'all', value: '' }];
      //Clean field error if current field is valid
      if (!invalid) errorCleaner.push({ field, value: '' });
      handle.error(errorCleaner);
    },
    // On blur (after the focus)
    blur: (event: FormEvent) => {
      const { field } = inputFieldValues(event);
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
    //Get boolean to disable submit button
    disabledButton: ((): boolean => {
      const { email, password } = inputValues;
      return !!invalidateFields({ email, password });
    })(),
    //Verify if some field has an error
    hasError: ((): string => {
      const hasError = Object.values(error).filter((err) => !!err).length;
      return !!hasError ? 'Please fill the form correctly' : '';
    })(),
  };

  return {
    data: inputValues,
    error,
    handle,
    getValue,
  };
};

export default useAccess;

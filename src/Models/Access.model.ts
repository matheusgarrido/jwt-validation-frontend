import Joi from '@hapi/joi';
import validate from '../helpers/modelValidation';

// Schema fields config value
const EMAIL_FIELD = Joi.string().email().lowercase().required();
const PASSWORD_FIELD = Joi.string().min(6).required();

interface IFormLogin {
  email: string;
  password: string;
}

export const loginValidation = (data: IFormLogin) => {
  const schema = Joi.object({
    email: EMAIL_FIELD,
    password: PASSWORD_FIELD,
  });
  return validate(schema, data);
};

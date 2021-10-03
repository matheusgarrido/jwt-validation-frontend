import Joi from '@hapi/joi';
import validate from '../helpers/modelValidation';

// Schema fields config value
const EMAIL_FIELD = Joi.string().email().lowercase();
const PASSWORD_FIELD = Joi.string().min(6);

export const loginValidation = (data: Object) => {
  const schema = Joi.object({
    email: EMAIL_FIELD,
    password: PASSWORD_FIELD,
  });
  return validate(schema, data);
};

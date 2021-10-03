import { ObjectSchema } from '@hapi/joi';

export default function validate(schema: ObjectSchema, data: Object) {
  const validation = schema.validate(data, { abortEarly: false });
  if (validation.error) {
    console.log(validation);
    return validation.error.details;
  }
  return null;
}

import Validator from '../validator.js';

const todoValidator = ({id, name, email }) => {
  const errors = {};

  
  const nameValidator = new Validator(name)
    .required('Privalomas pavadinimas')
    .min(4, 'Mažiausiai 4 simboliai')
    .max(32, 'Daugiausiai 32 simboliai');
  if (nameValidator.hasErrors) errors.title = nameValidator.HTMLError;

  const emailValidator = new Validator(email)
  .required('privaloma')
  .email('neteisingas el. pašto formatas');
if (emailValidator.hasErrors) errors.email = emailValidator.HTMLError;
  return errors;
}

export default todoValidator;

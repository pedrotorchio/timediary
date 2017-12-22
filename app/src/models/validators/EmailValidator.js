import isEmail from 'validator/lib/isEmail';
import trim from 'validator/lib/trim';

export default function validate(email){
  email = trim(email);

  if(isEmail(email))
    return email;
  else
    throw 'Email Inválido';
}

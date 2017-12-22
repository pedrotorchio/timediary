import trim from 'validator/lib/trim';

export default function validate(pass){
  pass = trim(pass);

  return pass;
}

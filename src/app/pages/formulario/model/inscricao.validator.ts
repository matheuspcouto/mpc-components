import { Validators } from '@angular/forms';

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const emailValidator = [
  Validators.email,
  Validators.required,
  Validators.pattern(regexEmail)
];

const regexTelefone = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
export const telefoneValidator = [
  Validators.minLength(11),
  Validators.required,
  Validators.pattern(regexTelefone)
];

import {
  cleanInputValueOf,
  recoverInputValueBy,
} from './DOMmanipulators';

export function setInputOnSuccessAsync(input) {
  return () => cleanInputValueOf(input);
}

export function setInputOnFailAsync(input, name) {
  return () => recoverInputValueBy(input, name);
}

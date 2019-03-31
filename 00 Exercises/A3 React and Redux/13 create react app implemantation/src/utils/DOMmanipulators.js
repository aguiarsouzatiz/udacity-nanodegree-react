export function cleanInputValueOf(input) {
  input.value = '';
}

export function recoverInputValueBy(input, valueToRecover) {
  input.value = valueToRecover;
}

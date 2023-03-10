import _ from 'lodash';

/**
 * CHECKS if the passed value is EMPTY string or not
 * RETURN `true` if string is EMPTY else RETURN `false`
 */
export function isEmpty(val: any) {
  let isValEmpty = true;
  if (!_.isNil(val) && _.trim(String(val)).length > 0) {
    isValEmpty = false;
  }
  return isValEmpty;
}

/**
 * Checks if the passed value is valid email
 * RETURN `true` if VALID else RETURN `false`
 */
export function isEmail(val: string) {
  let isValid = true;
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (isEmpty(val)) {
    isValid = false;
  } else if (!regex.test(val)) {
    isValid = false;
  }
  return isValid;
}
// LogIn/Join DATA Vaildation
export const USERNAME_MIN_LENGTH = 5;
export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_NUM_REGEX = new RegExp(/^(?=.*[0-9]).+$/);
export const PASSWORD_NUM_REGEX_ERROR =
  'Password should contain at least one number(012345789).';
export const EMAIL_ALLOWED_DOMAIN = ['zod.com'];

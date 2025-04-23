'use server';

import {
  PASSWORD_NUM_REGEX,
  PASSWORD_NUM_REGEX_ERROR,
  EMAIL_ALLOWED_DOMAIN,
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
} from '@/lib/constants';
import { z } from 'zod';

// check
const passwordRegexChk = PASSWORD_NUM_REGEX;

const checkAllowedDomain = (formEmail: string) => {
  const domain = formEmail.split('@')[1];
  return EMAIL_ALLOWED_DOMAIN.includes(domain);
};

// Schema
const formSchema = z.object({
  formName: z
    .string({
      invalid_type_error:
        '사용자 이름이 정확히 입력되지 않았습니다. 확인 후 입력해 주세요.',
      required_error: '사용자 이름은 필수 입력 입니다.',
    })
    .toLowerCase()
    .trim()
    .min(USERNAME_MIN_LENGTH, 'Username should be at least 5 characters long.'),
  formEmail: z
    .string({
      invalid_type_error:
        '이메일 정확히 입력되지 않았습니다. 확인 후 입력해 주세요.',
      required_error: '이메일은 필수 입력 입니다.',
    })
    .email()
    .toLowerCase()
    .refine(checkAllowedDomain, 'Only @zod.com emails are allowed'),
  formPassword: z
    .string()
    .regex(passwordRegexChk, PASSWORD_NUM_REGEX_ERROR)
    .min(
      PASSWORD_MIN_LENGTH,
      'Password should be at least 10 characters long.'
    ),
});

export async function Login(prevState: any, formData: FormData) {
  const data = {
    formName: formData.get('formName'),
    formEmail: formData.get('formEmail'),
    formPassword: formData.get('formPassword'),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
  }
}

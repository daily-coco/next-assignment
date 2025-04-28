'use server';

import {
  EMAIL_ALLOWED_DOMAIN,
  PASSWORD_MIN_LENGTH,
  PASSWORD_NUM_REGEX,
  PASSWORD_NUM_REGEX_ERROR,
  USERNAME_MIN_LENGTH,
} from '@/lib/constants';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

//password Regex
const passwordRegexChk = PASSWORD_NUM_REGEX;

//email domain validation Function
const checkAllowedDomain = (email: string) => {
  const domain = email.split('@')[1];
  return EMAIL_ALLOWED_DOMAIN.includes(domain);
};

//Schema
const formSchema = z.object({
  username: z
    .string({
      invalid_type_error: '사용자의 이름을 정확히 입력해주세요',
      required_error: '사용자의 이름은 필수 입력입니다.',
    })
    .toLowerCase()
    .trim()
    .min(USERNAME_MIN_LENGTH, '사용자 이름은 최소 5자 입력해야 합니다.'),
  email: z
    .string({
      invalid_type_error:
        '이메일 정확히 입력되지 않았습니다. 확인 후 입력해 주세요.',
      required_error: '이메일은 필수 입력 입니다.',
    })
    .email()
    .toLowerCase()
    .refine(checkAllowedDomain, '오직 @zod.com 도메이만 허용됩니다.'),
  password: z
    .string({
      invalid_type_error: '정확한 비밀번호를 입력해주세요.',
      required_error: '비밀번호 입력은 필수 입력입니다.',
    })
    .regex(passwordRegexChk, PASSWORD_NUM_REGEX_ERROR)
    .min(PASSWORD_MIN_LENGTH, '패스워드는 최소 10자 입니다.'),
  passwordConfirm: z
    .string({
      invalid_type_error: '확인을 위한 비밀번호를 입력해주세요.',
      required_error: '확인 비밀번호 입력은 필수 입력입니다.',
    })
    .regex(passwordRegexChk, PASSWORD_NUM_REGEX_ERROR)
    .min(PASSWORD_MIN_LENGTH, '패스워드는 최소 10자 입니다.'),
});

export async function CreateAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = await formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // passwrod hash
    const hashPassword = await bcrypt.hash(result.data.password, 12);
    // save DB
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashPassword,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();

    redirect('/profile');
  }
}

'use server';

import bcrypt from 'bcrypt';
import db from '@/lib/db';
import { z } from 'zod';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

const checkEmailExists = async (formEmail: string) => {
  const user = await db.user.findUnique({
    where: {
      email: formEmail,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

// Schema
// form schema로는 이메일 검사
const formSchema = z.object({
  formEmail: z
    .string({
      invalid_type_error:
        '이메일 정확히 입력되지 않았습니다. 확인 후 입력해 주세요.',
      required_error: '이메일은 필수 입력 입니다.',
    })
    .email()
    .toLowerCase()
    .refine(checkEmailExists, '입력한 이메일 존재하지 않습니다.'),
  formPassword: z.string({
    required_error: 'Password is required',
  }),
});

export async function Login(prevState: any, formData: FormData) {
  const data = {
    formEmail: formData.get('formEmail'),
    formPassword: formData.get('formPassword'),
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // 이메일 존재하는 경우
    const user = await db.user.findUnique({
      where: {
        email: result.data.formEmail,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const ok = await bcrypt.compare(
      result.data.formPassword,
      user!.password ?? 'xxxx'
    );

    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect('/profile');
    } else {
      return {
        fieldErrors: {
          formEmail: ['잘못된 패스워드를 입력하셨습니다.'],
          formPassword: [],
        },
      };
    }
  }
}

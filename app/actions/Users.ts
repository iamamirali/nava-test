'use server';

import z from 'zod';
import { fetchApi } from '../../lib/api';

const ENTITY = 'Users';

export interface SendCodeState {
  success: boolean;
  errors?: {
    mobile?: string[];
  };
  message: string;
}

const schema = z.object({
  mobile: z.number('اجباریه').min(15, 'کارکتر بیشتری وارد کن'),
});

export async function sendCode(
  _prevState: SendCodeState,
  formData: FormData,
): Promise<SendCodeState> {
  const rawMobile = formData.get('mobile');
  const mobile = typeof rawMobile === 'string' ? rawMobile.trim() : '';

  const validatedFields = schema.safeParse({
    mobile,
  });

  if (!validatedFields.success) {
    const errors = z.treeifyError(validatedFields.error);
    console.log(errors.properties?.mobile?.errors);

    return {
      success: false,
      message: '',
      errors: {
        mobile: errors.properties?.mobile?.errors,
      },
    };
  }

  try {
    const response = await fetchApi(`/${ENTITY}/SendCode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobile }),
    });

    return {
      success: true,
      message: 'کد تایید با موفقیت ارسال شد.',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'ارسال کد با خطا مواجه شد.',
    };
  }
}

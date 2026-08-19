export interface ApiResponse<T> {
  value: T;
  isSuccess: boolean;
  errors: string[];
  message: string;
}

export interface MutationState<T = unknown> {
  success: boolean;
  message: string;
  value: T | null;
}

export async function postApi<T, Y>(
  url: string,
  body: T,
  customResponse?: Partial<MutationState<Y>>,
) {
  return await fetchApi(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
    customResponse,
  );
}

export async function fetchApi<T>(
  url: string,
  options?: RequestInit,
  customResponse?: Partial<MutationState<T>>,
): Promise<MutationState<T>> {
  const response = await fetch(`${process.env.BASE_API_URL ?? ''}${url}`, {
    ...options,
  });
  const data: ApiResponse<T> = await response.json();

  if (!response.ok || !data.isSuccess) {
    return {
      success: false,
      message: data.message,
      value: data.value,
    };
  }

  return {
    success: true,
    message: customResponse?.message ?? data.message,
    value: customResponse?.value ?? data.value,
  };
}

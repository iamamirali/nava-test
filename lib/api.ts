export async function fetchApi(
  url: string,
  options?: RequestInit,
): Promise<unknown> {
  const response = await fetch(`${process.env.BASE_API_URL ?? ''}${url}`, {
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'درخواست با خطا مواجه شد.');
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

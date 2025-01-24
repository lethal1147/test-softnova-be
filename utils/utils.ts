export function handleSuccessResponse<T>({
  data,
  message,
}: {
  data: T;
  message: string;
}) {
  return {
    error: false,
    statusCode: 200,
    data,
    message,
  };
}

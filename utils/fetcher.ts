// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetcher = (input: RequestInfo, init: RequestInit): Promise<any> =>
  fetch(input, init).then((res) => res.json());

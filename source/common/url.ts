type ExtractParamName<T extends string> = T extends `:${infer P}` ? P : never;

type ExtractParams<Path extends string> =
  Path extends `${infer Before}/:${infer Param}/${infer After}`
    ? ExtractParamName<`:${Param}`> | ExtractParams<`/${After}`>
    : Path extends `${infer Before}/:${infer Param}`
      ? ExtractParamName<`:${Param}`>
      : never;

export type RouteParams<Path extends string> = {
  [K in ExtractParams<Path>]: string;
};

export function buildURL<Path extends string>(
  url: Path,
  req: RouteParams<Path>,
) {
  const keys = Object.keys(req);
  let newURL = url;
  for (let key of keys)
    // @ts-ignore
    newURL = newURL.replace(`:${key}`, req[key]);

  return newURL;
}

type ExtractParamName<T extends string> = T extends `:${infer P}` ? P : never;
type ExtractParams<Path extends string> = Path extends `${infer Before}/:${infer Param}/${infer After}` ? ExtractParamName<`:${Param}`> | ExtractParams<`/${After}`> : Path extends `${infer Before}/:${infer Param}` ? ExtractParamName<`:${Param}`> : never;
type RouteParams<Path extends string> = {
    [K in ExtractParams<Path>]: string;
};
declare function buildURL<Path extends string>(url: Path, req: RouteParams<Path>): Path;

export { type RouteParams, buildURL as default };

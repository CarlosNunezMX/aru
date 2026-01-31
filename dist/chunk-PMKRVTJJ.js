// source/common/url.ts
function buildURL(url, req) {
  const keys = Object.keys(req);
  let newURL = url;
  for (let key of keys)
    newURL = newURL.replace(`:${key}`, req[key]);
  return newURL;
}

export { buildURL };

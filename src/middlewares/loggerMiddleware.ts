export const loggerMiddleware = (req: any, res: any, next: any) => {
  var end = res.end;
  res.end = function (chunk: any, encoding: any) {
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode}`);
    res.end = end;
    res.end(chunk, encoding);
  };

  next();
};

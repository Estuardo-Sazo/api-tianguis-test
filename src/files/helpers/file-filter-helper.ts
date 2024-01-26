export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function,
) => {
  //console.log(file);
  if (!file) return callback(new Error('File Empty'), false);

  const fileExptension = file.mimetype.split('/')[1];
  const validExptension = ['jpg', 'jpeg', 'png', 'gif'];

  if (validExptension.includes(fileExptension)) return callback(null, true);

  callback(null, false);
};

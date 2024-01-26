import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function,
) => {
  //console.log(file);
  if (!file) return callback(new Error('File Empty'), false);

  const fileExptension = file.mimetype.split('/')[1];
  const fileName = `${uuid()}.${fileExptension}`;

  callback(null, fileName);
};

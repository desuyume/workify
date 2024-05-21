import * as path from 'path';
import * as fs from 'fs';

export const removeFile = (fileName: string) => {
  if (
    fs.existsSync(path.join(__dirname, '..', '..', 'static', fileName))
  ) {
    fs.unlinkSync(
      path.resolve(__dirname, '..', '..', 'static', fileName),
    );
  }
};

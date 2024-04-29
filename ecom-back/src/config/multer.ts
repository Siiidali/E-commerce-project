import { format } from 'date-fns';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/../../static/uploads');
  },
  filename: (req, file, cb) => {
    const now = new Date();
    const formattedDate = format(now, 'yyyy-MM-dd_HH-mm');
    const sanitizedOriginalName = file.originalname.replace(/\s+/g, ' ');
    const filename = `${formattedDate}_${sanitizedOriginalName}`;
    cb(null, filename);
  }
});

const multerInstance = multer({ storage });

export default multerInstance;

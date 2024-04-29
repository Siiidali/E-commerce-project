import multerInstance from '../config/multer';

const uploadImage = () => {
  return multerInstance.single('image');
};

export default uploadImage;

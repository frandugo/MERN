const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: path.join(__dirname, '../public/uploads'),
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname.toLocaleLowerCase() );
	}
});

const upload = multer({
	storage,
    dest: path.join(__dirname, '../public/uploads'),
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname){
            return cb(null, true);
				}
				cb("Error: Archivo debe ser una imagen valida");
    }
}).single('image');


module.exports = upload;
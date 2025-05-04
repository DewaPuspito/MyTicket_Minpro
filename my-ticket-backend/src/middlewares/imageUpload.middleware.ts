import multer from 'multer'

const storage = multer.memoryStorage()

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb: any) => {
        if(!file.mimetype.startsWith('image/jpg') && !file.mimetype.startsWith('image/jpeg') && !file.mimetype.startsWith('image/png') && !file.mimetype.startsWith('image/webp')) {
            return cb(new Error('Only image files are allowed'), false)
        }
        cb(null, true)
    }
})
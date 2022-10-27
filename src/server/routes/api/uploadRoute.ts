import * as express from 'express';
import * as multer from 'multer';
import { isUser } from '../../middlewares';
import { uploadS3 } from '../../utils/s3';
import { sendVerificationEmail } from '../../utils/mailgun';

const router = express.Router();
const storage = multer.memoryStorage();
const fileUpload = multer({ storage });

router.post('/', isUser, fileUpload.single("photo"), async (req, res) => {
    try {
        if (!req.userIsVerified) {
            await sendVerificationEmail(req.email);
            return res.status(403).json({ message: 'Please verify your email before uploading.'});
        }
        // @ts-ignore
        const uploaded = await uploadS3(req.file.buffer, req.file.originalname);
        //@ts-ignore
        const image_url = uploaded.Location;
        res.json(image_url);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Upload failed.'})
    }
})

export default router;
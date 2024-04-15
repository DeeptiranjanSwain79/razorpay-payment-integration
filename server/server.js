import express from "express";
import { config } from "dotenv";
import Razorpay from 'razorpay';
import paymentRouter from "./routes/payment.route.js";
import cors from "cors";
import { connectDB } from "./db.js";
import multer from "multer";
const upload = multer({ dest: 'uploads/' });

const app = express();
config({ path: "./.env" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
})

app.get('/', (req, res) => {
    res.status(200).send("API is working fine");
});

app.get('/api/v1/get-payment-key', (req, res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY
    })
});

app.use('/api/v1', paymentRouter);

app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`));
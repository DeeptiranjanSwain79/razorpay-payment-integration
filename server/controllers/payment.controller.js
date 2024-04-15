import { Payment } from "../models/payment.model.js";
import { instance } from "../server.js";
import crypto from "crypto";

export const checkout = async (req, res, next) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR"
        }

        const order = await instance.orders.create(options);
        res.status(201).json({
            success: true,
            order
        })
    } catch (error) {
        console.log(error);
    }
}

export const paymentVerification = async (req, res, next) => {
    try {

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        let body = razorpay_order_id + "|" + razorpay_payment_id;

        const exprctedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
            .update(body.toString()).digest('hex');


        const isAuthentic = exprctedSignature === razorpay_signature;
        if (isAuthentic) {
            await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });
            res.redirect(`http://localhost:3000/payment-success?reference=${razorpay_payment_id}`)
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
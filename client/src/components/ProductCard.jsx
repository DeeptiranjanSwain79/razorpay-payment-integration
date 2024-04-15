import { Button, Image, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';

const ProductCard = ({ amount, img, text }) => {

    const checkoutHandler = async () => {
        const { data: { key } } = await axios.get('http://localhost:3500/api/v1/get-payment-key');
        const response = await axios.post("http://localhost:3500/api/v1/checkout", {
            amount
        });

        if (response && response.data && response.status === 201) {

            const options = {
                key,
                amount: response.data.order.amount,
                currency: "INR",
                name: "Deeptiranjan Swain",
                description: "Test Razorpay learn",
                image: "https://avatars.githubusercontent.com/u/87275698?v=4",
                order_id: response.data.order.id,
                callback_url: "http://localhost:3500/api/v1/payment-verification",
                prefill: {
                    name: "Deeptiranjan Swain",
                    email: "coderhappy777@gmail.com",
                    contact: "8917206636"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#6f1717"
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        }
    }
    return (
        <VStack>
            <Image src={img} alt='' boxSize={'64'} objectFit={'cover'} />
            <Text>{text}</Text>
            <Text>₹{amount}</Text>
            <Button onClick={checkoutHandler}>Buy Now</Button>
        </VStack>
    )
}

export default ProductCard
import React, { useEffect } from 'react';
import { Box, Stack } from "@chakra-ui/react";
import ProductCard from '../components/ProductCard';

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

const Home = () => {
    const test = async () => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if (!res) {
            window.alert('Razorpay SDK failed to load. Are you online?')
            return
        }
        console.log(window)
    }
    test();

    return (
        <Box>
            <Stack height={'100vh'} alignItems={'center'} justifyContent={"center"} direction={['column', 'column', 'row']}>
                <ProductCard
                    text="iPhone 13 128GB"
                    amount={8}
                    img={'https://thegoodguys.sirv.com/products/50077913/50077913_788623.PNG?scale.height=215&scale.width=215&canvas.height=215&canvas.width=215&canvas.opacity=0'}
                />
                <ProductCard
                    text="Macbook Pro - M1 chip"
                    amount={200000}
                    img={'https://www.aptronixindia.com/media/catalog/product/m/b/mbp14-spacegray-select-202110_1.jpeg'}
                />
            </Stack>
        </Box>
    )
}

export default Home
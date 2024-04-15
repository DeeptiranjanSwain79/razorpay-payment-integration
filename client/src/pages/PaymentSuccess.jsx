import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
    const searchQuery = useSearchParams()[0];
    const referenceNumber = searchQuery.get("reference");
    return (
        <Box>
            <VStack h="100vh" justifyContent={'center'}>
                <Heading textTransform={"uppercase"}>Payment Successful</Heading>

                <Text>Reference No. {referenceNumber}</Text>
            </VStack>
        </Box>
    )
}

export default PaymentSuccess
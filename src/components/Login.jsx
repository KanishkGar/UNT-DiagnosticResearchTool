import { Input, Center , Stack, Button} from '@chakra-ui/react'

export const Login = (props) => {
    return (
        <Center width={"100vw"} height={"75vh"}>
            <Stack spacing={4} align='center'>
                <Input placeholder='Input Login' size='lg' htmlSize={16} width='auto' />
                <Button colorScheme='blue' variant='outline' onClick={(text) => {}}>
                    Log in
                </Button>
            </Stack>
        </Center>
    )
}
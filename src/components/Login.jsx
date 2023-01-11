import { Input, Center, Stack, Button } from '@chakra-ui/react'
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from "recoil";
import { loggedInAtom } from "../atoms";
import database from "./Firebase";
import { ref, child, get} from "firebase/database";

export const Login = (props) => {
    const setLoggedIn = useSetRecoilState(loggedInAtom);
    const [value, setValue] = useState("");

    const loginOnClick = () => {
        let dataref = ref(database);
        get(child(dataref, `Tests Taken/${value}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setLoggedIn(value);
            } else {
                console.log("Login Failed");
            }
        }).catch((error) => {
            console.log("Login Failed");
            console.error(error);
        });
    }
    // const 
    return (
        <Center width={"100vw"} height={"75vh"}>
            <Stack spacing={4} align='center'>
                <Input value={value} onChange={(event) => setValue(event.target.value)} placeholder='Input Login' size='lg' htmlSize={16} width='auto' />
                <Button colorScheme='blue' variant='outline' onClick={loginOnClick}>
                    Log in
                </Button>
            </Stack>
        </Center>
    )
}
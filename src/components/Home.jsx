import { Box, SimpleGrid } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { ImageData } from "./ImageData"
import { Label } from "./Label"
import { Submit } from "./Submit"
import { TextData } from "./TextData"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, child, get } from "firebase/database";


export const Home = () => {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAolu6iMo_ZbJKGatkES5meh4X-uQXCcaQ",
        authDomain: "drt2-62447.firebaseapp.com",
        databaseURL: "https://drt2-62447-default-rtdb.firebaseio.com",
        projectId: "drt2-62447",
        storageBucket: "drt2-62447.appspot.com",
        messagingSenderId: "837394038584",
        appId: "1:837394038584:web:c7358bdc8512ba1d41cbcd"
    };
    const [questions, setQuestions] = useState([]);

    const getCase = (database, complaint, caseNum) => {
        get(child(database, `Complaints/${complaint}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val()["Cases"][caseNum]["Groups"]);
                let newQuestions = [];
                for(const [groupName, groupQuestions] of Object.entries(snapshot.val()["Cases"][caseNum]["Groups"])){
                    let groupQuestionsData = [];
                    for(const [question, answer] of Object.entries(groupQuestions)){
                        groupQuestionsData.push({
                            type: "text",
                            title: question,
                            data: answer,
                            showing: false
                        });
                    }
                    newQuestions.push({
                        label: groupName,
                        data: groupQuestionsData
                    })
                }
                setQuestions(newQuestions);
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);
        getCase(ref(database), "Patient comes to the clinic complaining of headaches", "1");
    }, []);

    return (
        <>
            <SimpleGrid columns={[1, 2, 3]}>
                {questions.map((el, idx) => {
                    return (
                        <Box mx={5} key={idx}>
                            <Label title={el.label} />
                            {el.data.map((button, index) => {
                                return (
                                    (button.type === "text") ? <TextData key={index} data={button} /> : <ImageData key={index} data={button} />
                                )
                            })}
                        </Box>
                    )
                })}
            </SimpleGrid>
            <Submit />
        </>
    )
}
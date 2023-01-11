import { Box, SimpleGrid, Flex, Heading, Spacer, ButtonGroup, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { ImageData } from "./ImageData"
import { Label } from "./Label"
import { Submit } from "./Submit"
import { TextData } from "./TextData"
import { child, get } from "firebase/database";
import database from "./Firebase";
import { ref } from "firebase/database";


export const Home = () => {
    const [questions, setQuestions] = useState([]);
    const [diagnoses, setDiagnoses] = useState([]);
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const complaint = "Patient comes to the clinic complaining of headaches";


    const getCase = (database, complaint, caseNum) => {
        get(child(database, `Complaints/${complaint}`)).then((snapshot) => {
            if (snapshot.exists()) {
                // Get the question data and map it into the correct format
                let newQuestions = [];
                for (const [groupName, groupQuestions] of Object.entries(snapshot.val()["Cases"][caseNum]["Groups"])) {
                    let groupQuestionsData = [];
                    for (const [question, answer] of Object.entries(groupQuestions)) {
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
                    });
                }
                setQuestions(newQuestions);

                // Get the diagnoses data and put it into the correct format
                let newDiagnoses = [];
                for (const [idx, diagnosis] of Object.entries(snapshot.val()["Diagnoses"])) {
                    newDiagnoses.push(diagnosis);
                }
                setDiagnoses(newDiagnoses);

                //Get age and gender
                setAge(snapshot.val()["Cases"][caseNum]["Age"]);
                setGender(snapshot.val()["Cases"][caseNum]["Gender"]);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getCase(ref(database), complaint, "1");
    }, []);

    return (
        <>
            <Heading size='md' mx={5}>Prompt: {complaint}</Heading>
            <Flex minWidth='max-content' alignItems='center' gap='2' mx={3}>
                <Box p='2'>
                    <Heading size='md'>Age: {age}</Heading>
                    <Heading size='md'>Gender: {gender}</Heading>
                </Box>
                <Spacer />
                <Button colorScheme='teal'>Submit Working Diagnosis</Button>
            </Flex>
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
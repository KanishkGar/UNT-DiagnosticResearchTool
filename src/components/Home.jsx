import { Box, SimpleGrid, Flex, Heading, Spacer, ButtonGroup, Button, Container } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { ImageData } from "./ImageData"
import { Label } from "./Label"
import { Submit } from "./Submit"
import { TextData } from "./TextData"
import { child, get } from "firebase/database";
import database from "./Firebase";
import { ref, onValue } from "firebase/database";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil"
import { workingDiagnosisDoneAtom, caseNumberAtom, loggedInAtom, doneWithStudyAtom } from "../atoms";


export const Home = () => {
    const [questions, setQuestions] = useState([]);
    const [diagnoses, setDiagnoses] = useState([]);
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [caseNum, setCaseNum] = useState("");
    const complaint = "Patient comes to the clinic complaining of headaches";
    const [workingDiagnosisDone, setWorkingDiagnosisDone] = useRecoilState(workingDiagnosisDoneAtom);
    const loggedIn = useRecoilValue(loggedInAtom);
    const setDoneWithStudy = useSetRecoilState(doneWithStudyAtom);


    const getCase = (caseNum) => {
        console.log(caseNum);
        get(child(ref(database), `Complaints/${complaint}`)).then((snapshot) => {
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
                console.log(newQuestions);
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
        const caseNumberRef = child(ref(database), `Tests Taken/${loggedIn}`);
        onValue(caseNumberRef, (snapshot) => {
            const savedValues = snapshot.val();

            //check if study completed
            if("10" in savedValues){
                setDoneWithStudy(true);
                return;
            }
            //find next case to do
            for (let i = 1; i <= 10; i++) {
                if (!(i.toString() in savedValues)) {
                    setCaseNum(i.toString());
                    getCase(i.toString());
                    break;
                }
            }
        }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        });
    }, []);

    return (
        <>
            <Heading size='lg' mx={5} my={5}>
                Prompt: {complaint} <br />
                Case {caseNum} of 10
            </Heading>
            <Container bg='blue.100' color='blue.600' borderRadius='lg' mx={5} my={0} borderWidth='1px' padding="3" minWidth={"45%"}>
                <b>Step 1: </b> Ask Questions. Ask until you think you know what the diagnosis might be.<br />
                <b>Step 2: </b> Lock in your working primary, secondary, and tertiary diagnoses.<br />
                <b>Step 3: </b> Continue asking questions until you are confident that you know what the diagnosis is.<br />
                <b>Step 4: </b> Lock in and submit your final primary, secondary, and tertiary diagnosis

            </Container>
            <Flex minWidth='max-content' alignItems='center' gap='2' mx={3}>
                <Box p='2'>
                    <Heading size='md'>Age: {age}</Heading>
                    <Heading size='md'>Gender: {gender}</Heading>
                </Box>
                <Spacer />
                <Submit diagnoses={diagnoses} workingOrFinal={workingDiagnosisDone ? "Final" : "Working"} caseNum={caseNum} />
            </Flex>
            <SimpleGrid columns={[1, 2, 3]}>
                {questions.map((el, idx) => {
                    return (
                        <Box mx={5} key={idx}>
                            <Label title={el.label} />
                            {el.data.map((button, index) => {
                                return (
                                    (button.type === "text") ? <TextData key={index} data={button}/> : <ImageData key={index} data={button} />
                                )
                            })}
                        </Box>
                    )
                })}
            </SimpleGrid>
        </>
    )
}
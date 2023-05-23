import { Box, HStack, Text, VStack } from "@chakra-ui/react"
import database from "./Firebase";
import { loggedInAtom } from "../atoms";
import { useRecoilValue } from "recoil";
import { ref, get, child } from "firebase/database";
import { useEffect, useState } from "react";

export const Done = () => {
    const loggedIn = useRecoilValue(loggedInAtom);
    const [snapValState, setSnapValState] = useState({});
    const set_data = () => {
        get(child(ref(database), `Tests Taken/${loggedIn}`))
            .then((snapshot) => snapshot.val())
            .then((snapshotVal) => {
                setSnapValState(snapshotVal);
            })
    }

    useEffect(() => {
        set_data();
    }, []);

    const dateToString = (unixTimestamp) => {
        // Convert Unix timestamp to milliseconds
        const date = new Date(unixTimestamp); //  * 1000

        // Get minutes and seconds from the date object
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const milliseconds = date.getMilliseconds();

        // Output the result
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().substring(0, 2)}`;
    }

    function CaseResultComponent(props) {
        const answer = ["", "Myocardial Infarction", "Pulmonary Embolism"]
        if (!snapValState[props.caseNum])
            return <></>;
        const snapshotVal = snapValState[props.caseNum];
        /*
            -	Order of all features asked for
            -	Total Number of features asked for
            -	Total time per case
            -	Average time per feature
            -	Was differential in top 3 at the working diagnosis stage?
            -	Was differential in top 1 at the working diagnosis stage?
            -	Was differential in top 3 at final submit stage?
            -	Was differential in top 1 at final submit stage?
        */
        let featuresOrderList = []
        for (const timestamp in snapshotVal["Clicks"]) {
            featuresOrderList.push(snapshotVal["Clicks"][timestamp].replaceAll("\\", "/"));
        }
        const timeForCase = snapshotVal['FinalDiagnosis']['Timestamp'] - snapshotVal['CaseStartTime'];
        const timePerFeature = timeForCase / featuresOrderList.length;
        return (<>
            <VStack alignItems="flex-start" m={5}>
                <Text fontWeight="bold" fontSize='xl'>Case {props.caseNum}: {answer[props.caseNum]}</Text>
                <HStack alignItems="flex-start" width={"100%"}> {/* m={5} */}
                    <Box m={0} width="50%">
                        <Text fontWeight="bold">Features Order:</Text>
                        <Box ml={6}>
                            <ol>
                                {featuresOrderList.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ol>
                        </Box>


                    </Box>
                    <Box m={0} width="50%">
                        <Text><b>Total Time for Case:</b> {dateToString(timeForCase)}</Text>
                        <Text><b>Time per Feature:</b> {dateToString(timePerFeature)}</Text>
                        <Text><b>Was diagnosis in top 3 at the working differential stage?</b> {(new Set(Object.values(snapshotVal['WorkingDiagnosis']))).has(answer[props.caseNum]) ? "Yes" : "No"}</Text>
                        <Text><b>Was diagnosis in top 1 at the working differential stage?</b> {snapshotVal['WorkingDiagnosis']['Primary'] === answer[props.caseNum] ? "Yes" : "No"}</Text>
                        <Text><b>Was diagnosis in top 3 at final submit stage?</b> {(new Set(Object.values(snapshotVal['FinalDiagnosis']))).has(answer[props.caseNum]) ? "Yes" : "No"}</Text>
                        <Text><b>Was diagnosis in top 1 at final submit stage?</b> {snapshotVal['FinalDiagnosis']['Primary'] === answer[props.caseNum] ? "Yes" : "No"}</Text>

                    </Box>
                </HStack>
            </VStack>
            {/* <Box m={5}>
                <Text fontWeight="bold" fontSize='xl'>Case {props.caseNum}: {answer[props.caseNum]}</Text>
                <Text fontWeight="bold">Features Order:</Text>
                <Box ml={6}>
                    <ol>
                        {featuresOrderList.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ol>
                </Box>
                <Text><b>Total Time for Case:</b> {dateToString(timeForCase)}</Text>
                <Text><b>Time per Feature:</b> {dateToString(timePerFeature)}</Text>
                <Text><b>Was diagnosis in top 3 at the working differential stage?</b> {(new Set(Object.values(snapshotVal['WorkingDiagnosis']))).has(answer[props.caseNum]) ? "Yes" : "No"}</Text>
                <Text><b>Was diagnosis in top 1 at the working differential stage?</b> {snapshotVal['WorkingDiagnosis']['Primary'] === answer[props.caseNum] ? "Yes" : "No"}</Text>
                <Text><b>Was diagnosis in top 3 at final submit stage?</b> {(new Set(Object.values(snapshotVal['FinalDiagnosis']))).has(answer[props.caseNum]) ? "Yes" : "No"}</Text>
                <Text><b>Was diagnosis in top 1 at final submit stage?</b> {snapshotVal['FinalDiagnosis']['Primary'] === answer[props.caseNum] ? "Yes" : "No"}</Text>

            </Box> */}
        </>)
    }

    return (<>
        <CaseResultComponent caseNum={1} />
        <CaseResultComponent caseNum={2} />
        {/* <Box m={5}>
            <Text>Thanks for participating in our research study! Your responses have been recorded and you may now leave this tab.</Text>
        </Box> */}
    </>)
}
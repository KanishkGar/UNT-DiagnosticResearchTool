import { atom } from "recoil";

export const loggedInAtom = atom({
    key: 'loggedIn',
    default: "",
})

export const doneWithStudyAtom = atom({
    key: 'doneWithStudy',
    default: false,
})

export const clickCounterAtom = atom({
    key: 'clickCounter',
    default: 0
})

export const workingDiagnosisDoneAtom = atom({
    key: 'workingDiagnosisDone',
    default: false
})

export const clicksDataAtom = atom({
    key: 'clicksData',
    default: {}
})

export const workingDiagnosisDataAtom = atom({
    key: 'workingDiagnosisData',
    default: {}
})

export const questionsAtom = atom({
    key: 'questionsAtom',
    default: []
})

export const caseStartTimeAtom = atom({
    key: 'caseStartTime',
    default: Date.now().toString()
})
import { atom } from "recoil";

export const loggedInAtom = atom({
    key: 'loggedIn',
    default: false,
})

export const doneWithStudyAtom = atom({
    key: 'doneWithStudy',
    default: false,
})

// make some structure for form data
export const formDataAtom = atom({
    key: 'formData',
    default: {}
})

// make some structure for case data
export const caseDataAtom = atom({
    key: 'caseData',
    default: {}
})
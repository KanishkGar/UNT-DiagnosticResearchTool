import { Box, SimpleGrid } from "@chakra-ui/react"
import { ImageData } from "./ImageData"
import { Label } from "./Label"
import { Submit } from "./Submit"
import { TextData } from "./TextData"

export const Home = () => {
    const questions = [
        {
            label: "HISTORY | Demographics | Age",
            data: [{
                type: "text",
                title: "Age",
                data: "15 years",
                showing: false
            }]
        },
        {
            label: "HISTORY | Past CT Scan",
            data: [{
                type: "image",
                title: "CT Scan Image",
                data: "https://blog.beekley.com/hubfs/Imported_Blog_Media/opacified.jpg",
                showing: false
            }]
        }

    ]

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
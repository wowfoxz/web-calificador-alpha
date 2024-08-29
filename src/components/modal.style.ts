import createStyles from "@mui/styles/createStyles"

export const stylesheet = createStyles({
    paperContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        bgcolor: "background.paper",
        border: "1px solid #7B808088",
        p: 4,
        height: "auto",
        maxHeight: "80%",
        display: "block",
        overflowY: "scroll",
        // position: "fixed",
        overflow: "hidden",
    },
    paperContainer2: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        bgcolor: "background.paper",
        border: "1px solid #7B808088",
        p: 4,
        height: "auto",
        maxHeight: "80%",
        display: "block",
        overflowY: "scroll",
    },
})
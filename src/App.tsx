import { Box, Typography } from "@mui/material";
import RichTextEditor from "./components/RichTextEditor/RichTextEditor";
import { useState } from "react";

function App() {
  const [content, setContent] = useState("");

  return (
    <>
      <Typography variant="h5" component="h1">
        Chaptr Post Migrator
      </Typography>
      <Box sx={{ maxWidth: "800px" }}>
        <RichTextEditor content={content} setContent={setContent} />
      </Box>
    </>
  );
}

export default App;

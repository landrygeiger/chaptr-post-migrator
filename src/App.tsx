import { useState } from "react";
import RichTextEditor from "./editor/RichTextEditor";
import "./global.css";
import { createTheme, ThemeProvider } from "@mui/material";

function App() {
  const [content, setContent] = useState("");
  const theme = createTheme({
    palette: {
      primary: {
        main: "#79242F",
      },
      secondary: {
        main: "#9e8959",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>Chaptr Post Migrator</h1>
        <RichTextEditor content={content} setContent={setContent} />
      </div>
    </ThemeProvider>
  );
}

export default App;

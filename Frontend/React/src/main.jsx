import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ColorModeScript } from "@chakra-ui/react";
import { routes } from "./routes/routes";
import "./index.css";
import theme from "./utils/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <RouterProvider router={routes} />
  </>,
);

import { createBrowserRouter } from "react-router-dom";
import { LineMiniPage } from "@pages/LineMiniPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LineMiniPage />,
  },
]);

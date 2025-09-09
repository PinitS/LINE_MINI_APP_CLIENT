import ClickRectangle from "@pages/ClickRectangle";
import DraftPage from "@pages/DraftPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    // element: <DraftPage />,
    element: <ClickRectangle />,
    // errorElement: <ErrorPage />,
  },
]);

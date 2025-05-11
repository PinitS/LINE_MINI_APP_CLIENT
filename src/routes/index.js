import DemoPage from "@pages/DemoPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/:id",
    element: <DemoPage />,
    // errorElement: <ErrorPage />,
  },
]);

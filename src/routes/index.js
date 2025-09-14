import ClickRectangle from "@pages/ClickRectangle";
import DraftPage from "@pages/DraftPage";
import { createBrowserRouter } from "react-router-dom";
import LineSvg from "@pages/LineSvg";
import RenderDraftPage from "@pages/RenderDraftPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DraftPage />,
    // element: <DraftPage />,
    // element: <LineSvg />,
    // errorElement: <ErrorPage />,
  },

  {
    path: "/render-draft",
    element: <RenderDraftPage />,
  },
]);

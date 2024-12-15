import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Basic/Login";
import Browse from "./Main/Browse";

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/browse", element: <Browse /> },
  ]);

  return (
    <>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </>
  );
};
export default Body;

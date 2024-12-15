import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Browse from "./Main/Browse";
import GoogleLogin from "./Basic/GoogleLogin";
import Login from "./Basic/Login";

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <GoogleLogin /> },
    { path: "/login", element: <Login /> },
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

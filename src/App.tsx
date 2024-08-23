import { RouterProvider, createBrowserRouter } from "react-router-dom";
import router from "./router";
import { Fragment } from "react/jsx-runtime";
const App = () => {
  return (
    <Fragment>
      <RouterProvider router={createBrowserRouter(router)} />
    </Fragment>
  );
};

export default App;

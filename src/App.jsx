import { Provider } from "react-redux";
import "./App.css";
import Body from "./Components/Body";
import appStore from "./utils/store/appStore";

function App() {
  return (
    <>
    <Provider store={appStore}>
      <Body />
      </Provider>
      {/* <GoogleLogin/> */}
    </>
  );
}

export default App;

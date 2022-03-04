import { Provider } from "react-redux";
import createApp from "./dva";
import models from "./models";
// import "promise-prototype-finally";

import "./app.scss";
import "./assets/iconfont/iconfont.css";

const dvaApp = createApp({
  initialState: {},
  models,
});

const store = dvaApp.getStore();

const App = ({children}) =>{

  return (
    <Provider store={store}>{children}</Provider>
  )
}

export default App;

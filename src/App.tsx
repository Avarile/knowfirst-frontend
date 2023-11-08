import { ConfigProvider } from "antd";
import React from "react";
import Main from "./app";


const App: React.FC = () => (
  <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
      <Main />
  </ConfigProvider>
);

export default App;

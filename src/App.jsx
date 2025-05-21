import { useState } from "react";
import Dashboard from "./components/Dashboard";
import { setupMockAPI } from "./API/mockaxios";
import { StateProvider } from "./statecontext/statecontext";

import "./App.css";
setupMockAPI();

function App() {
  return (
    <>
      <StateProvider>
        <div className="maindashboard">
          <Dashboard />
        </div>
      </StateProvider>
    </>
  );
}

export default App;

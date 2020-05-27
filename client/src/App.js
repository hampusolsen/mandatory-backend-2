import React from "react";
import { Route } from "react-router-dom";
import Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import Mainmenu from "./components/Mainmenu/Mainmenu";
import Workspace from "./components/Workspace/Workspace";

export default function App() {
  return (
    <div className="App">
      <Route exact path="/client" component={Mainmenu} />
      <DndProvider backend={Backend}>
        <Route exact path="/client/:workspaceId" component={Workspace} />
      </DndProvider>
    </div>
  );
}

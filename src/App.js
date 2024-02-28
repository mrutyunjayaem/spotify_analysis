import React from "react";
import { BrowserRouter, Route,Routes, } from "react-router-dom";
import LoginPage from "./LoginPage";
import ArtistsFollowedPage from "./AritstsFollowedPage";
import HomePage from "./HomePage";

function App(){
    return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}></Route>
        <Route path="/HomePage" element = {<HomePage/>}></Route>
        <Route path="/AritstsFollowedPage" element = {<ArtistsFollowedPage/>}></Route>
        <Route path="/LoginPage" element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
    </div>
    );
}

export default App;

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Poll } from "./components/Poll";
import { Polls } from "./components/Polls";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Polls />} />
                    <Route path="/poll/:id" element={<Poll />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

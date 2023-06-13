import "./App.css";
import React, { useEffect, useState } from "react";
import StocksComponent from "./components/StocksComponent";
import { io } from "socket.io-client";

function App() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        getSocket();
    });

    const getSocket = () => {
        if (socket === null) {
            setSocket(io("http://localhost:1923"));
        } else {
            console.log(socket);
        }
    };

    return (
        <div className="container">
            <h1 style={{ marginTop: "50px", marginBottom: "20px" }}>StoNks</h1>
            {socket ? <StocksComponent socket={socket} /> : <h5>Loading...</h5>}
        </div>
    );
}

export default App;

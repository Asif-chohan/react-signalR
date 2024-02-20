import React, { useState, useEffect } from 'react';
import * as signalR from "@microsoft/signalr";

const SignalRDemo = () => {
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5001/hub")
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start().then(() => {
        console.log("SignalR Connected");
        connection.on("ReceiveMessage", (message) => {
          setMessage(message);
        });
      }).catch((err) => console.error(err));
    }
  }, [connection]);

  console.log("rendering", connection);

  return (
    <div>
      <h1>SignalR Demo</h1>
      <p>{message}</p>
    </div>
  );
};

export default SignalRDemo;

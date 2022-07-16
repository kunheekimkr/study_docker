import React, { useState, useEffect } from "react";
import axios from "axios";

import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    axios.get("/api/values").then((response) => {
      console.log("response", response);
      setLists(response.data);
    });
  }, []);

  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  const changeHandler = (event) => {
    setValue(event.currentTarget.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("/api/value", {
        value: value,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("response.data", response.data);
          setLists([...lists, response.data]);
          setValue("");
        } else {
          alert("Failed to save value");
        }
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists &&
            lists.map((list, index) => <li key={index}>{list.value}</li>)}
          <br />
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Enter..."
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">Enter</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
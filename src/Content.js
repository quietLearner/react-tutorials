import { React, useState } from "react";

const Content = () => {
  const handleNameChange = () => {
    const names = ["bob", "kevin", "dave"];
    const int = Math.floor(Math.random() * 3); // [0,2]
    setName(names[int]);
  };

  //hook
  const [name, setName] = useState("Mike");
  const [count, setCount] = useState(0);

  // count does not change in this function, it comes in as 0, it will be 0 throughout this function
  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1); // only the last setCount works
    console.log(`you clicked it ${count} times`);
  };

  const handleClick2 = () => {
    console.log(`count is ${count}`);
  };

  const handleClick3 = (e) => {
    console.log(e);
    console.log(e.target, e.target.innerText);
  };
  return (
    <main>
      <p> Content {name}</p>

      <button onClick={handleNameChange}>change name!</button>
      <button onClick={handleClick}>Count</button>
      <button onClick={handleClick2}>Show Count</button>

      <button onClick={(e) => handleClick3(e)}>Click It!</button>
    </main>
  );
};

export default Content;

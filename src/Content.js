import { React, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const Content = () => {
  //hook
  const [items, setItems] = useState([
    {
      id: 1,
      checked: true,
      item: "One half pound bag of Cocoa Covered Almonds Unsalted",
    },
    {
      id: 2,
      checked: false,
      item: "Item 2",
    },
    {
      id: 3,
      checked: false,
      item: "Item 3",
    },
  ]);

  // const handleCheck = (item) => {
  //   // shadow copy
  //   const listItems = [...items];
  //   listItems.forEach((i) => {
  //     if (i.id === item.id) {
  //       i.checked = true;
  //     } else {
  //       i.checked = false;
  //     }
  //   });

  //   setItems(listItems);
  // };

  const handleCheck = (id) => {
    const listItems = items.map(
      (item) => (item.id === id ? { ...item, checked: !item.checked } : item) // I dont understand this code
    );

    setItems(listItems);
    localStorage.setItem("shoppinglist", JSON.stringify(listItems));
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);

    setItems(listItems);
    localStorage.setItem("shoppinglist", JSON.stringify(listItems));
  };

  return (
    <main>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li className="item" key={item.id}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheck(item.id)}
              ></input>
              <label
                style={item.checked ? { textDecoration: "line-through" } : null}
                onDoubleClick={() => handleCheck(item.id)}
              >
                {item.item}
              </label>
              <FaTrashAlt
                role="button"
                tabIndex={0}
                onClick={() => handleDelete(item.id)}
              ></FaTrashAlt>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: "2rem" }}>No Items</p>
      )}
    </main>
  );
};

export default Content;

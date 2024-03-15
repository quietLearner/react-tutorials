import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

import { useState, useEffect } from "react";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";

function App() {
  //hook
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppinglist")) || []
  );

  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  //console.log("before use effect");

  // why not use contrcutor?
  useEffect(() => {
    localStorage.setItem("shoppinglist", JSON.stringify(items));
  }, [items]); //only render when items updated

  // console.log("after use effect");

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;

    var addedItem = {
      id,
      checked: false,
      item,
    };

    const listItems = [...items, addedItem];

    setItems(listItems);
  };

  const getItems = () => {
    if (!search) return items;

    const filteredItems = items.filter((i) =>
      i.item.toLowerCase().includes(search.toLowerCase())
    );

    return filteredItems;
  };

  const handleCheck = (id) => {
    const listItems = items.map(
      (item) => (item.id === id ? { ...item, checked: !item.checked } : item) // this is spread operator, https://www.w3schools.com/react/react_es6_spread.asp
    );

    setItems(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);

    setItems(listItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newItem) return;

    addItem(newItem);

    setNewItem("");
  };

  // jsx
  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch}></SearchItem>
      <Content
        items={getItems()}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      ></Content>
      <Footer length={items.length} />
    </div>
  );
}

export default App;

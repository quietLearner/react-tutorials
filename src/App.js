import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

import { useState, useEffect } from "react";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3500/items";

  //hook
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL); //GET http://localhost:3500/itemss 404 (Not Found)
      if (!response.ok) {
        throw Error("Did not receive expected data");
      }
      const listItems = await response.json(); //Unexpected token 'N', "Not Found" is not valid JSON
      console.timeLog(listItems);
      setItems(listItems);
      setFetchError(null);
    } catch (err) {
      //console.error(err.stack);
      // console.error(err.message);
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  //console.log("before use effect");

  //https://blog.csdn.net/lunahaijiao/article/details/117639301
  // https://blog.csdn.net/weixin_43484007/article/details/124362873
  // why not use contrcutor?
  /*
  https://react.dev/learn/synchronizing-with-effects
  Effects are typically used to “step out” of your React code and synchronize with some external system
  Most Effects should only re-run when needed rather than after every render
  useEffect “delays” a piece of code from running until that render is reflected on the screen
  By wrapping the DOM update in an Effect, you let React update the screen first. Then your Effect runs.

    https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
  */
  useEffect(() => {
    //simulate time deplay to get data from outside api.
    setTimeout(fetchItems, 2000);
    //fetchItems();
  }, []); // useEffect after the initial render, you can give it an empty array as second argument.

  // console.log("after use effect");
  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;

    var addedItem = {
      id,
      checked: false,
      item,
    };

    const listItems = [...items, addedItem];

    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addedItem),
    };

    const errorMessage = await apiRequest(API_URL, postOptions);
    if (errorMessage) {
      setFetchError(errorMessage);
    }
  };

  const getItems = () => {
    if (!search) return items;

    const filteredItems = items.filter((i) =>
      i.item.toLowerCase().includes(search.toLowerCase())
    );

    return filteredItems;
  };

  //toggle item's checked value
  const handleCheck = async (id) => {
    const listItems = items.map(
      (item) => (item.id === id ? { ...item, checked: !item.checked } : item) // this is spread operator, https://www.w3schools.com/react/react_es6_spread.asp
    );

    setItems(listItems);

    /*
    GET  /users - This retrieves a list of all resource entities of users.
    GET /users/:id - This retrieves a specific user by its id.
    POST /users - This creates a new user.
    PUT /users/:id - This updates a user based on a specified id.
    DELETE /users/:id - This deletes a user based on the specified id.
    */

    // if item's checkbox is clicked, update the checked field in db.json
    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH", //"PUT", do not use put, it will remove other fields
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
    if (result) {
      setFetchError(result);
    }
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);

    setItems(listItems);

    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
    if (result) {
      setFetchError(result);
    }
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
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Content
            items={getItems()}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          ></Content>
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;

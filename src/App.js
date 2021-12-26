import Header from "./Header.js";
import SearchItem from "./SearchItem.js";
import AddItem from "./AddItem.js";
import Content from "./Content";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import apiRequest from "./apiRequest.js";
function App() {
  const API_URL = "http://localhost:3500/items";
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [fetchErr, setFetchErr] = useState(null);
  const [loading,isLoading] = useState(true);
  // useEffect(()=>{localStorage.setItem("shoppinglist", JSON.stringify(items));
  //   // this localstorage is used so that we can see the same state even after reload for itemList in shoppingList memory
  //  },[items] )
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw Error("cannot find response");
        const itemList = await res.json();
        console.log(itemList);
        setItems(itemList);
        setFetchErr(null);
      } catch (err) {
        console.log(err);
        setFetchErr(err.message);
      }finally{
        isLoading(false);
      }
    };

    // (async () => await fetchItems()) ();
    setTimeout(() => {
      (async () => await fetchItems())();
      
    }, 2000);
  }, []);

  const addItem = async(item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const itemList = [...items, myNewItem];
    setItems(itemList);
    const postOptions = {
      method : 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if(result) setFetchErr(result);
  };

  const handleChange = async (id) => {
    const itemList = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    // here we have used ternary operator along with rest operatr so that we can do the same function for all items
    setItems(itemList);
    const myItem =  itemList.filter((item)=> item.id === id) 
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'content-type' : "application/json"
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    }
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl,updateOptions);
    if(result) setFetchErr(result);
  };
  const deleteItems = async (id) => {
    const itemList = items.filter((item) => item.id !== id);
    setItems(itemList);
    // const itemDel = itemList.filter((item)=>itemList - item.id)
    const delItems = {
      method : 'DELETE',
      }
    
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl,delItems);
    if(result) setFetchErr(result);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return; // it says if the item is null or undefined
    addItem(newItem);
    setNewItem(""); // after submission it will set the input bar as blank
  };
  return (
    <div className="App">
      <Header title="Shopping List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {loading && <p> Loading Items... </p>}
        {fetchErr && <p style={{color: 'red'}}>{`Error: ${fetchErr}`}</p> }
        {!fetchErr && !loading &&
        // here we used !fetchErr(if no fetch error) because if there would be fetch error then it will not display the empty list because it won;t be loaded in to it
        <Content
          items={items.filter((item) =>
            item.item.toLowerCase().includes(search.toLowerCase())
          )}
          setItems={setItems}
          handleChange={handleChange}
          deleteItems={deleteItems}
        />
          } 
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;

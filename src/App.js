import Header from "./Header.js";
import SearchItem from "./SearchItem.js";
import AddItem from "./AddItem.js";
import Content from "./Content";
import Footer from "./Footer";
import { useState } from "react";

function App() {
  const[search,setSearch] = useState('')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('shoppinglist'))
  );
  const [newItem, setNewItem]= useState('')

  const saveAndSetItems = (newItems) => {
    setItems(newItems);
    //here we canged the state of item to unchecked or checked
    localStorage.setItem("shoppinglist", JSON.stringify(newItems));
    // this localstorage is used so that we can see the same state even after reload for itemList in shoppingList memory
  };

  const addItem = (item)=>{
    const id = items.length? items[items.length-1].id + 1 : 1 ;
    const myNewItem = { id, checked:false, item };
    const itemList = [...items,myNewItem];
    saveAndSetItems(itemList);
  }

  const handleChange = (id) => {
    const itemList = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    // here we have used ternary operator along with rest operatr so that we can do the same function for all items
    saveAndSetItems(itemList);
  };
  const deleteItems = (id) => {
    const itemList = items.filter((item) => item.id !== id);
    saveAndSetItems(itemList);
  };
  const handleSubmit= (e)=>{
    e.preventDefault();
    if(!newItem)return; // it says if the item is null or undefined
    addItem(newItem);
    setNewItem('') // after submission it will set the input bar as blank
    
  }
  return (
    <div className="App">
      <Header title="Shopping List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}         
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        setItems={setItems}
        handleChange={handleChange}
        deleteItems={deleteItems}
      />
      <Footer length= {items.length} />
    </div>
  );
}

export default App;

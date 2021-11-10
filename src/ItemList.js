import LineItems from "./LineItems";

const ItemList = ({ items, handleChange, deleteItems }) => {
  return(
  <ul>
    {items.map((item) => (
      <LineItems
        key = {item.id}
        item={item}
        handleChange ={handleChange}
        deleteItems={deleteItems}
      />
    ))}
  </ul>
  )
};

export default ItemList;

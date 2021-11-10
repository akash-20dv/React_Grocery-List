import  ItemList  from './ItemList';

const Content = ({ items, handleChange, deleteItems }) => {
  return (
    <main>
      {items.length ? (
       <ItemList
            items = {items}
            handleChange= {handleChange}
            deleteItems = {deleteItems}
       />
      ) : (
        <p style={{ marginTop: "2rem" }}>Your list is empty </p>
      )}
    </main>
  );
};

export default Content;

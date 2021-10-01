//Import styling and react
import './App.css';
import React, { useEffect, useState } from "react";

function App() {
  //states
  const [foodData, setFoodData] = useState([]);
  const [searchFood, setSearchFood] = useState("");
  const [listedData, setListedData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ modalDetail, setModalDetail] = useState({});

  //fetching the api
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(data => { setFoodData(data); })
  }, []);
  //this useeffect will be mounted everytime when the foodData changes.
  useEffect(() => {
    setListedData(foodData);
  }, [foodData]);// [foodData] -> this code is making the upper comment section possible.

  // search function
  useEffect(() => {
    const listedData = foodData.filter(item => item.title.includes(searchFood));
    setListedData(listedData);
  }, [searchFood]);

  const searchFunction = (e) => {
    setSearchFood(e.target.value);
  }

  

  //   const deleteFunction = id => {
  //   const deletedData = foodData.filter(item => item.id !== id);
  //   console.log(id);
  //   setListedData(deletedData);
  // }
  //Deleting Selected Food
  const deleteCheck = (event) => {
    const item = event.target;
    //delete food-container
    if (item.classList[0] === "delete-button") {
      const foodcontainer = item.parentElement.parentElement;
      foodcontainer.remove();
    }
  }
  // useEffect(()=>{
  //   const timeOut =setTimeout(()=>{
  //     openModal()
  //   },3000)
  //   clearTimeout(timeOut);
  //   return(alert("Food Deleted"));
  // })

  // showing modal func.
  const openModal = () => {
    setShowModal(true);
  }
  // closing modal func.
  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <body className="body">
      <nav className="nav-bar">
        <div className="search-bar">
          <input className="input" type="text" value={searchFood} onChange={searchFunction} />
          <img src="https://www.pngkey.com/png/detail/15-152459_open-search-bar-icon-png.png" className="search-bar-icon" alt="" />
        </div>
      </nav>
      {
        showModal && <>
          <div className="modal-background">
            <div className="modal-wrapper">
              <div className="close-modal-button-container">
                <button className="close-modal-button" onClick={closeModal}> X </button>
              </div>
              <div className="modal-info">
                <strong>How many people ordered this menu => {modalDetail.id}</strong>
                <p>{modalDetail.title}</p>
                <p>{modalDetail.body}</p>
              </div>
            </div>
          </div> </>
      }
      <div className="food-card-container">
        {
          //We use here the listedData because we want to make search bar working aswell.
          listedData.map(food => (
            <div key={food.id} className="food-item">
              <img className="food-image" src="https://www.freeiconspng.com/uploads/junk-food-png-transparent-images--png-all-15.png" alt="" />
              <div className="title-body-container">
                <h2 className="h2"> {food.title}</h2>
                <p className="p"> {food.body}</p>
              </div>
              <div className="delete-and-edit-buttons-container">
                <button target="_blank" className="edit-button" onClick={()=>{setModalDetail(food)
                openModal()}}>Info</button>
                <button className="delete-button" onClick={deleteCheck}>Delete</button>
              </div>
            </div>
          ))
        }
      </div>
      <footer className="footer-container">
        <div className="footer-info">
          <strong>Created by Yağız. Follow me on <a href="https://github.com/yagizyldrm" target="_blank">GITHUB</a></strong>
        </div>
      </footer>
    </body>
  );
}
export default App;

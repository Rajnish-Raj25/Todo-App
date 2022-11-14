import React, { useEffect, useState } from "react";
import "./Todo.css";
import images from "../image/images.png";

const TodoApp = () => {
  const getLocalstorageData = () => {
    let list = localStorage.getItem("lists");
    if (list) {
      return JSON.parse(localStorage.getItem("lists"));
    } else {
      return [];
    }
  };

  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState(getLocalstorageData());

  // seting list to localStorage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(item));
  }, [item]);

  const additem = () => {
    if (!inputData) {
    } else {
      setItem([...item, inputData]);
      setInputData("");
    }
  };

  const deleteitem = (id) => {
    let updatedlist = item.filter((curritem, ind) => {
      return id !== ind;
    });
    setItem(updatedlist);
  };
  const removeall = () => {
    return setItem([]);
  };
  return (
    <>
      <div className="container">
        <div className="todo_container">
          <div className="todo_logo">
            <img src={images} alt="" />
            <h3>Keep your Task here..</h3>
          </div>
          <div className="todo_input">
            <input
              type="text"
              placeholder="Enter your Task ..."
              autoFocus
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            <i className=" fa fa-solid fa-plus add_btn" onClick={additem}></i>
          </div>
          <div className="task">
            {item.map((elem, ind) => {
              return (
                <>
                  <div className="each_task" key={ind}>
                    <h3>{elem}</h3>
                    <div className="icon">
                      <i className="fa fa-edit"></i>
                      <i
                        className="fa fa-trash-alt"
                        onClick={() => deleteitem(ind)}
                      ></i>
                    </div>
                  </div>
                </>
              );
            })}
            <button className="remove_btn" onClick={removeall}>
              Remove All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoApp;

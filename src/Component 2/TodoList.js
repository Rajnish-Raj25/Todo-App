import React, { useEffect, useState } from "react";
import "../component/Todo.css";

const TodoList = () => {
  const getData = () => {
    const data = localStorage.getItem("lists");
    if (data) {
      return JSON.parse(localStorage.getItem("lists"));
    } else {
      return [];
    }
  };

  const [text, setText] = useState("");
  const [task, setTask] = useState(getData());

  // get data from local storage

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const addtask = () => {
    if (!text) {
    } else {
      const allInput = { id: new Date().getTime().toString(), name: text };
      setTask([...task, allInput]);
      setText("");
    }
  };

  const removeAll = () => {
    setTask([]);
  };

  const deleteItem = (index) => {
    let updated = task.filter((curr) => {
      return index !== curr.id;
    });
    setTask(updated);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(task));
  }, [task]);

  return (
    <div className="container">
      <div className="todo_container">
        <div className="todo_input">
          <input
            type="text"
            placeholder="write here"
            value={text}
            onChange={handleChange}
          />
          <i className="fa fa-plus add_btn" onClick={addtask}></i>
        </div>
        <div className="task">
          {task.map((item) => {
            return (
              <>
                <div className="each_task" key={item.id}>
                  <h3>{item.name}</h3>
                  <div className="icon">
                    <i className="fa fa-edit"></i>
                    <i
                      className="fa fa-trash-alt"
                      onClick={() => deleteItem(item.id)}
                    ></i>
                  </div>
                </div>
              </>
            );
          })}

          <div className="remove_btn" onClick={removeAll}>
            remove all
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;

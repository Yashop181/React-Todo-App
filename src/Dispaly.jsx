import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, CompleteTask, unCompleteTask, editData, MyEditSave } from "./todoSlice";
import "./index.css";

const Display = () => {
  const [val, setVal] = useState("");
  const [editBtnFlag, setEditBtnFlag] = useState(true);
  const [tmpId, setTmpId] = useState("");
  const mydata = useSelector((state) => state.todo.task);
  const myeditData = useSelector((state) => state.todo.workdata);
  const MyDispatch = useDispatch();

  const myTaskAdd = () => {
    if (val.trim() !== "") {
      MyDispatch(addTask(val));
      setVal("");
    } else {
      alert("Please enter a task before adding!");
    }
  };

  const myTaskDelete = (myid) => {
    MyDispatch(deleteTask(myid));
  };

  const myTaskComplete = (myid) => {
    MyDispatch(CompleteTask(myid));
  };

  const myTaskUncomplete = (myid) => {
    MyDispatch(unCompleteTask(myid));
  };

  const myTaskEdit = (myid) => {
    MyDispatch(editData(myid));
    setEditBtnFlag(false);
    setTmpId(myid);
  };

  useEffect(() => {
    setVal(myeditData);
  }, [myeditData]);

  const editDataSave = () => {
    MyDispatch(MyEditSave({ id: tmpId, myData: val }));
    setEditBtnFlag(true);
    setVal("");
  };

  const ans = mydata.map((key, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td className={key.status ? "" : "completed-task"}>
        {key.status ? key.work : <span>{key.work}</span>}
      </td>
      <td>
        <button onClick={() => myTaskDelete(key.id)}>Delete</button>
      </td>
      <td>
        <button onClick={() => myTaskComplete(key.id)}>Complete</button>
      </td>
      <td>
        <button onClick={() => myTaskUncomplete(key.id)}>UnComplete</button>
      </td>
      <td>
        <button onClick={() => myTaskEdit(key.id)}>Edit</button>
      </td>
    </tr>
  ));

  return (
    <div className="container">
      <h1>React TodoList App </h1>
      <label htmlFor="task">Enter Task:</label>
      <input
        type="text"
        className="task-input"
        placeholder="Enter task here..."
        name="task"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
        }}
      />
      {editBtnFlag ? (
        <button className="add-btn" onClick={myTaskAdd}>Add Task</button>
      ) : (
        <button className="save-btn" onClick={editDataSave}>Save Edit</button>
      )}
      <hr />
      <table className="task-table">
        <thead>
          <tr>
            
            <th>S.No</th>
            <th>Task</th>
            <th>Delete</th>
            <th>Complete</th>
            <th>Uncomplete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{ans}</tbody>
      </table>
    </div>
  );
};

export default Display;

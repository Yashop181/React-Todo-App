import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, CompleteTask, unCompleteTask, editData, MyEditSave } from "./todoSlice";
import "./index.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.success('Task added successfully!');
    } else {
      toast.error('Plase Enter a task');
    }
  };

  const myTaskDelete = (myid) => {
    MyDispatch(deleteTask(myid));
    toast.success('Task Delete successfully!');
  };

  const myTaskComplete = (myid) => {
    MyDispatch(CompleteTask(myid));
    toast.success('Task Completed successfully!');
  };

  const myTaskUncomplete = (myid) => {
    MyDispatch(unCompleteTask(myid));
    toast.success('Task assignment unsuccessful.');
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
    toast.success('Task Edited successfully ');
  };

  const ans = mydata.map((key, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td className={key.status ? "" : "completed-task"}>
        {key.status ? key.work : <span>{key.work}</span>}
      </td>
      <td>
        <button onClick={() => myTaskDelete(key.id)} className="delete-btn">Delete</button>
      </td>
      <td>
        <button onClick={() => myTaskComplete(key.id)} className="complete-btn">Complete</button>
      </td>
      <td>
        <button onClick={() => myTaskUncomplete(key.id)} className="uncomplete-btn">UnComplete</button>
      </td>
      <td>
        <button onClick={() => myTaskEdit(key.id)} className="edit-btn">Edit</button>
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
        <button onClick={myTaskAdd} className="add-btn">Add Task</button>
      ) : (
        <button onClick={editDataSave} className="save-btn">Save Edit</button>
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

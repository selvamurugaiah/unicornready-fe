import React, { useContext, useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import "../styles/MainBoard.css";
import { API } from "../api";

const TaskListByTitle = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ projectTitle, setProjectTitle ] = useState("") // Assuming you get and set projectTitle from context

  const handleSearch = () => {
    if (!projectTitle) {
      // If projectTitle is not available, do not make the API request
      setTasks([]);
      return;
    }

    setLoading(true);

    // Make an API request to fetch tasks by project title
    fetch(`${API}/tasks/${projectTitle}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setTasks(data);
        
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  };

  return (
    <div className="column setup">
      <div className="search-bar">
        <input 
          style={{ width: "300px", 
          borderRadius: "5px", 
          height: "40px",
           
        }}
          type="text"
          placeholder="Search by project name or deadline"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
        />
        <button
          className="search_Btn_header"
          style={{
            height: "40px",
            justifyContent: "center",
            width: "70px",
            borderRadius: "5px",
            background: "yellow",
          }}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        
        tasks.length > 0 ? (
          tasks.map((task, index) => {
            return <TaskCard task={task} key={index} />;
          })
        ) : (
          <p className="no_task">
            No tasks found for the specified project title.
          </p>
        )
      )}
    </div>
  );
};

export default TaskListByTitle;

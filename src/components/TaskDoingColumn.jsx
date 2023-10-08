import React, { useContext, useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import "../styles/MainBoard.css";
import { MyContext } from "../context";
import { API } from "../api";
import { toast } from "react-toastify";

const TaskDoingColumn = () => {
  const [doingTasks, setDoingTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showTask, showAdd, showUpdate } = useContext(MyContext);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/tasks/doing`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setDoingTasks(data);
      });
  }, [showTask, showAdd, showUpdate]);

  const checkTaskDeadlines = (tasks) => {
    const currentDate = new Date();
    tasks.forEach((task) => {
      const deadlineDate = new Date(task.deadline);
      if (
        deadlineDate.getFullYear() === currentDate.getFullYear()&&
        deadlineDate.getMonth() === currentDate.getMonth() &&
        deadlineDate.getDate() === currentDate.getDate()
      ) {
        toast(`Project "${task.title}"  has a deadline today!`);
      }
    });
  };

  useEffect(() => {
    
    checkTaskDeadlines(doingTasks);

    
    const intervalId = setInterval(() => {
      checkTaskDeadlines(doingTasks);
    }, 60000); 

   
    return () => clearInterval(intervalId);
  }, [doingTasks]);

  if (loading) return <div>Loading...</div>;
  else
    return (
      <div className="column">
        <div className="column_header">
          <span className="column_header_dot"></span>
          <span className="column_header_title">
            Doing ({doingTasks.length})
          </span>
        </div>
        <div className="task_cards_cont">
          {doingTasks.length > 0 ? (
            doingTasks.map((each, index) => {
              return <TaskCard task={each} key={index} />;
            })
          ) : (
            <p className="no_task">No tasks to show</p>
          )}
        </div>
      </div>
    );
};

export default TaskDoingColumn;

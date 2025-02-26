import React, { useEffect, useState } from "react";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [task, setTask] = useState("");
  const [taskarray, setTaskarray] = useState(JSON.parse(oldTasks) || []);
  const [editIndex, setEditIndex] = useState(null); 

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (editIndex !== null) {
      const updatedTasks = [...taskarray];
      updatedTasks[editIndex].task = task;
      setTaskarray(updatedTasks);
      setEditIndex(null); 
    } else {
      setTaskarray([...taskarray, { task, iscompleted: false }]);
    }
    
    setTask("");
  };

  const deleteHandler = (index) => {
    let copytask = [...taskarray];
    copytask.splice(index, 1);
    setTaskarray(copytask);
  };

  const editHandler = (index) => {
    setTask(taskarray[index].task);
    setEditIndex(index); 
  };

  const togglehandler = (index) => {
    setTaskarray(
      taskarray.map((t, i) =>
        i === index ? { ...t, iscompleted: !t.iscompleted } : t
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskarray));
  }, [taskarray]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
        <div className="bg-white/20 backdrop-blur-lg rounded-lg shadow-2xl p-6 w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Todo App
          </h1>
          <form onSubmit={submitHandler}>
            <div className="flex justify-between items-center gap-2">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter Your task"
                className="flex-1 p-2 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                required
              />
              <button
                type="submit"
                className="bg-white/20 hover:bg-white/30 text-white cursor-pointer px-4 py-2 rounded-lg transition-colors"
              >
                {editIndex !== null ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>

          {taskarray.length > 0 && (
            <div className="mt-4 max-h-[300px] overflow-y-auto">
              <ul className="text-white space-y-2">
                {taskarray.map((t, i) => {
                  return (
                    <li
                      key={i}
                      className="flex items-center justify-between bg-white/20 p-3 rounded-lg"
                    >
                      <div className="w-full flex items-center space-x-3">
                        <input
                          type="checkbox"
                          className="w-5 h-5 cursor-pointer rounded border-white/30 bg-white/20"
                          checked={t.iscompleted}
                          onChange={() => togglehandler(i)}
                        />
                        <span
                          className={`text-white w-full ${
                            t.iscompleted ? "line-through opacity-70" : ""
                          }`}
                        >
                          {t.task}
                        </span>
                      </div>

                      <div className="flex justify-center items-center gap-2.5 flex-col">
                        <button
                          onClick={() => editHandler(i)}
                          className="cursor-pointer text-yellow-300 hover:text-yellow-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteHandler(i)}
                          className="cursor-pointer text-red-300 hover:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;

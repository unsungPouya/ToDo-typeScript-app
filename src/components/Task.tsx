import React, { useRef} from "react";
import Input from "./Input";
import useLocalStorage from "../hooks/useLocalStorage";

interface ProjectData {
  projectId: number;
  projectTitle: string;
  startTime: string;
  endTime: string;
  description: string;
  tasks: string[];
}
interface TaskProps {
  onCancel: () => void;
  projectID:number | null
}
export default function Task({ onCancel, projectID }: TaskProps) {
const [projects, setProjects] = useLocalStorage<ProjectData[]>('projects', []);
  const selectedProject = projects.find(item =>item.projectId === projectID)
  console.log('Selected Project:', selectedProject);
  const taskTitle = useRef<HTMLInputElement>(null)
  function handleAddTask() {
  if (selectedProject) {
      const newTask = taskTitle.current?.value;
      if (newTask) {
        const updatedProject = { ...selectedProject, tasks: [...selectedProject.tasks, newTask] };
        const updatedProjects = projects.map(project => project.projectId === projectID ? updatedProject : project);
        setProjects(updatedProjects);
        taskTitle.current.value = '';
      }
    }
  }
  function handleRemoveItem (item:string) {
    if (selectedProject) {
      const updatedProject = {
        ...selectedProject,
        tasks: selectedProject.tasks.filter((task) => task !== item),
      };
      const updatedProjects = projects.map((project) =>
        project.projectId === projectID ? updatedProject : project
      );
      setProjects(updatedProjects);
    }
  }
  console.log(selectedProject);
  return (
    <div className="w-2/3 m-auto space-y-5">
      <Input label="assign task" className="bg-zinc-700 rounded-md" ref={taskTitle}/>
      <footer className=" flex justify-center gap-3 mt-3">
        <button
          onClick={onCancel}
          className="w-1/3 p-2 bg-black text-xl rounded-md border-2 text-white"
        >
          Cancel
        </button>
        <button 
        onClick={handleAddTask}
        className="w-1/3 p-2 bg-black text-xl rounded-md border-2 border-yellow-500 text-yellow-500">
          Submit
        </button>
      </footer>
      <ul className="flex flex-col gap-2">
      {selectedProject?.tasks ? (
        selectedProject.tasks.map((task) => (
          <li key={task} className="bg-zinc-700 text-white p-2 rounded-md flex justify-between items-center">
            <p>{task}</p>
            <button onClick={() =>handleRemoveItem(task)} className="border-2 border-red-500 text-red-400 p-2 rounded-md">
              Delete
            </button>
          </li>
        ))
      ) : (
        <p>No tasks assigned</p>
      )}
      </ul>
    </div>
  );
}

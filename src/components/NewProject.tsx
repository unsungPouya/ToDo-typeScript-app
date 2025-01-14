import { useState, useRef } from "react";
import ProjectForm from "./ProjectForm";
import ProjectsDisplay from "./ProjectsDisplay";
import Task from "./Task";
import useLocalStorage from "../hooks/useLocalStorage";

interface ProjectData {
  projectId: number;
  projectTitle: string;
  startTime: string;
  endTime: string;
  description: string;
  tasks: string[];
}

interface Visibility {
  form?: boolean;
  taskForm?: boolean;
}

export default function NewProject() {
  // Replace useState with useLocalStorage for projects
  const [projects, setProjects] = useLocalStorage<ProjectData[]>('projects', []);

  // Replace the manual currentId state management with a custom hook or logic
  const [currentId, setCurrentId] = useState<number>(() => {
    if (projects.length > 0) {
      const maxId = Math.max(...projects.map((project) => project.projectId));
      return maxId + 1;
    }
    return 1;
  });

  const [visibility, setVisibility] = useState<Visibility>({
    form: false,
    taskForm: false,
  });

  function handleProjectSubmit(newProject: ProjectData) {
    setProjects((prevProjects) => [...prevProjects, newProject]);
    setCurrentId((prevId) => prevId + 1);
    setVisibility((prev) => ({ ...prev, form: false }));
  }

  function clearProjects() {
    setProjects([]); // This will automatically update localStorage
    setCurrentId(1);
  }

  function removeCurrentProject(projectId: number) {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.projectId !== projectId)
    );
  }

  const projectID = useRef<number | null>(null);

  function onSelectProject(id: number) {
    setVisibility((prev) => ({ ...prev, taskForm: true }));
    projectID.current = id;
  }

  return (
    <div>
      {visibility.form && (
        <ProjectForm
          currentId={currentId}
          onSubmit={handleProjectSubmit}
          onCancel={() => setVisibility((prev) => ({ ...prev, form: false }))}
        />
      )}
      {visibility.taskForm && projectID.current !== null && (
        <Task
          onCancel={() => setVisibility((prev) => ({ ...prev, taskForm: false }))}
          projectID={projectID.current}
        />
      )}

      <ProjectsDisplay
        projects={projects}
        onClearProjects={clearProjects}
        onRemoveProject={removeCurrentProject}
        setFormVisiblity={() =>
          setVisibility((prev) => ({ ...prev, form: true }))
        }
        onSelect={onSelectProject}
      />
    </div>
  );
}
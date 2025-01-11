import { useState, useEffect } from "react";
import ProjectForm from "./ProjectForm";
import ProjectsDisplay from "./ProjectsDisplay";

interface ProjectData {
  projectId: number;
  projectTitle: string;
  startTime: string;
  endTime: string;
  description: string;
}

export default function NewProject() {
  const [formVisibilty, setFormVisiblity] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectData[]>(() => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  const [currentId, setCurrentId] = useState<number>(() => {
    if (projects.length > 0) {
      const maxId = Math.max(...projects.map(project => project.projectId));
      return maxId + 1;
    }
    return 1;
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  function handleProjectSubmit(newProject: ProjectData) {
    setProjects((prevProjects) => [...prevProjects, newProject]);
    setCurrentId(prevId => prevId + 1);
    setFormVisiblity(false);
  }

  function clearProjects() {
    setProjects([]);
    setCurrentId(1);
    localStorage.removeItem("projects");
  }

  function removeCurrentProject(projectId: number) {
    setProjects(prevProjects => 
      prevProjects.filter(project => project.projectId !== projectId)
    );
  }

  return (
    <div>
      {formVisibilty ? (
        <ProjectForm 
          currentId={currentId}
          onSubmit={handleProjectSubmit}
          onCancel={() => setFormVisiblity(false)}
        />
      ) : (
        'choose or create a project'
      )}

      <ProjectsDisplay 
        projects={projects} 
        onClearProjects={clearProjects} 
        onRemoveProject={removeCurrentProject}
        setFormVisiblity={setFormVisiblity}
      />
    </div>
  );
}
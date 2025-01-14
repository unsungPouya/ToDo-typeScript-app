import { createPortal } from "react-dom";
interface ProjectData {
  projectId: number;
  projectTitle: string;
  startTime: string;
  endTime: string;
  description: string;
}

interface ProjectDisplayProps {
  projects: ProjectData[];
  onClearProjects: () => void;
  onRemoveProject: (projectId: number) => void;
  setFormVisiblity: (visible: boolean) => void;
  onSelect: (projectId: number) => void;
}

export default function ProjectsDisplay({
  projects,
  onClearProjects,
  onRemoveProject,
  setFormVisiblity,
  onSelect,
}: ProjectDisplayProps) {
  return createPortal(
    <div className="mt-6">
      <h1 className="text-center text-2xl font-bold">Projects List</h1>
      <div className="flex justify-center mt-2">
        <button
          onClick={() => setFormVisiblity(true)}
          className="p-2 rounded-md bg-slate-600"
        >
          + Add project
        </button>
      </div>
      <h2 className="text-center text-xl font-bold">Stored Projects</h2>
      {projects.length > 0 && (
        <button
          onClick={onClearProjects}
          className="bg-red-500 text-white py-2 px-5 m-auto rounded-md block mt-4"
        >
          Clear All Projects
        </button>
      )}
      {projects.length > 0 ? (
        <ul className="w-2/3 m-auto">
          {projects.map((project) => (
            <li key={project.projectId} className="border p-2 mb-2 rounded">
              <div className="flex justify-between">
                <h3 className="font-bold">Project ID: {project.projectId}</h3>
                <span className="text-sm text-gray-500">
                  {project.startTime} - {project.endTime}
                </span>
              </div>
              <h3 className="text-lg">{project.projectTitle}</h3>
              <p className="text-gray-600">{project.description}</p>
              <footer className="flex justify-between">
                <button
                  onClick={() => onSelect(project.projectId)}
                  className="border-2 border-blue-500 text-blue-500 rounded-md bg-black p-2"
                >
                  View details
                </button>
                <button
                  onClick={() => onRemoveProject(project.projectId)}
                  className="border-2 border-red-500 text-red-500 p-2 rounded-md bg-black"
                >
                  Remove this project
                </button>
              </footer>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No projects stored</p>
      )}
    </div>,
    document.getElementById("left")!
  );
}

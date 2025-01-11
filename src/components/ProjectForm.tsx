import React, { useState } from "react";
import Input from "./Input";

interface ProjectData {
  projectId: number;
  projectTitle: string;
  startTime: string;
  endTime: string;
  description: string;
}

interface ProjectFormProps {
  currentId: number;
  onSubmit: (project: ProjectData) => void;
  onCancel: () => void;
}

export default function ProjectForm({ 
  currentId, 
  onSubmit, 
  onCancel 
}: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectData>({
    projectId: currentId,
    projectTitle: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  function handleInputChange(key: keyof ProjectData, value: string) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newProject: ProjectData = {
      ...formData,
      projectId: currentId,
    };

    onSubmit(newProject);
    alert("Project successfully stored");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-1/2 m-auto">
      <Input
        label="Project Title!"
        type="string"
        onChange={(e) => handleInputChange("projectTitle", e.target.value)}
        value={formData.projectTitle}
      />
      <Input
        label="Start time"
        type="date"
        onChange={(e) => handleInputChange("startTime", e.target.value)}
        value={formData.startTime}
      />
      <Input
        label="End time"
        type="date"
        onChange={(e) => handleInputChange("endTime", e.target.value)}
        value={formData.endTime}
      />
      <Input
        label="Project description"
        isTextarea={true}
        onChange={(e) => handleInputChange("description", e.target.value)}
        value={formData.description}
      />
      <button
        type="submit"
        className="bg-black border-yellow-500 text-yellow-500 py-2 px-5 m-auto rounded-md w-fit"
      >
        Save Project
      </button>
      <button
        type="button"
        className="bg-black border-zinc-100 text-zinc-100 py-2 px-5 m-auto rounded-md w-fit"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
}
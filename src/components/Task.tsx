import React from "react";
import Input from "./Input";

interface TaskProps {
  onCancel: () => void;
  projectID:number | null
}
export default function Task({ onCancel, projectID }: TaskProps) {
  console.log(projectID);
  
  return (
    <div className="w-2/3 m-auto">
      <Input label="assign task" className="bg-zinc-700 rounded-md" />
      <footer className=" flex justify-center gap-3 mt-3">
        <button
          onClick={onCancel}
          className="w-1/3 p-2 bg-black text-xl rounded-md border-2 text-white"
        >
          Cancel
        </button>
        <button className="w-1/3 p-2 bg-black text-xl rounded-md border-2 border-yellow-500 text-yellow-500">
          Submit
        </button>
      </footer>
    </div>
  );
}

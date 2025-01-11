import NewProject from "./components/NewProject"
// import Project from "./components/Project"

function App() {

  return (
    <>
    <div>
      {/* <Project/> */}
      <div className="bg-gray-500 h-screen">
        <h1 className="text-center text-xl font-medium">
          task
        </h1>
        <NewProject/>
      </div>
    </div>
    </>
  )
}

export default App

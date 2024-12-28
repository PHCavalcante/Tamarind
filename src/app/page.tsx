import TaskManager from "./components/TaskManager";
import Menu from "./components/Menu";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="flex gap-5 h-screen w-full">
      <Menu />
      <div className="flex flex-col w-full h-full gap-4">
        <Header />
        <TaskManager />
      </div>  
    </div>
  );
}

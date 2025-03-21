import TaskManager from "./components/TaskManager";
import Menu from "./components/Menu";
import Header from "./components/Header";
import Snackbar from "./components/Snackbar";
export default function Home() {
  return (
    <div className="flex gap-5 h-screen min-w-full max-w-full selection:bg-[#ddd7d7]">
      <Menu />
      <div className="flex flex-1 flex-col h-full gap-4 max-w-full max-h-full w-full overflow-auto">
        <Header />
        <TaskManager />
        <Snackbar />
      </div>
    </div>
  );
}

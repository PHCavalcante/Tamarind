import { Dispatch, SetStateAction, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import Image from "next/image";
import icon from "@/app/icon.png";

type SettingsModalProps = {
  openSettingsModal: boolean;
  setOpenSettingsModal: Dispatch<SetStateAction<boolean>>;
};

function About() {
  return (
    <div className="w-full flex flex-col gap-6 p-4">
      {/* Header */}
      <div className="flex flex-col items-center gap-3">
        <Image src={icon} alt="icon" className="w-24 h-24 self-center" />
        <div className="text-center">
          <h1 className="text-2xl font-bold">Tamarind</h1>
          {/* <p className="text-sm text-gray-600 dark:text-gray-400">Beta v0.1.0</p> */}
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Your smart task manager</p>
        </div>
      </div>

      {/* Funcionalidades
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">✨ Funcionalidades</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Tarefas com checklist</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Notas com editor rico</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span>Listas com progresso</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span>Timer Pomodoro</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
            <span>Visualização Kanban</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            <span>Rotinas personalizadas</span>
          </div>
        </div>
      </div> */}

      {/* Links */}
      {/* <div className="space-y-3">
        <h2 className="text-lg font-semibold">🔗 Links Úteis</h2>
        <div className="space-y-2 text-sm">
          <a 
            href="#" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            📖 Documentação
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            🐛 Reportar Bug
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            💡 Sugerir Feature
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            ⭐ Avaliar no GitHub
          </a>
        </div>
      </div> */}

      {/* Tecnologias */}
      {/* <div className="space-y-3">
        <h2 className="text-lg font-semibold">🛠️ Tecnologias</h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Next.js</span>
          <span className="bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 px-2 py-1 rounded">React</span>
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">TypeScript</span>
          <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">Tailwind CSS</span>
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">MongoDB</span>
          <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">Clerk Auth</span>
        </div>
      </div> */}

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p>Made with ❤️ by <a href="https://github.com/PHCavalcante" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors" target="_blank" rel="author">PHCavalcante</a> to increase your productivity</p>
        <p className="mt-1">© {new Date().getFullYear()} Tamarind. All rights reserved.</p>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="w-full flex flex-col gap-6 p-4">
      {/* Header */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          U
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold">Seu Perfil</h1>
          <p className="text-sm text-gray-500 dark:text-gray-500">Acompanhe seu progresso</p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">📊 Suas Estatísticas</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-gray-600 dark:text-gray-400">Tarefas criadas</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-gray-600 dark:text-gray-400">Tarefas concluídas</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">0</div>
            <div className="text-gray-600 dark:text-gray-400">Minutos Pomodoro</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-gray-600 dark:text-gray-400">Dias de uso</div>
          </div>
        </div>
      </div>

      {/* Progresso Semanal */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">📈 Progresso Semanal</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Tarefas Concluídas</span>
            <span className="text-sm text-gray-600">0/7 dias</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
          </div>
        </div>
      </div>

      {/* Conquistas */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">🏆 Conquistas</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center opacity-50">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-xs">Primeira Tarefa</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center opacity-50">
            <div className="text-2xl mb-1">🔥</div>
            <div className="text-xs">7 Dias Seguidos</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center opacity-50">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-xs">Pomodoro Master</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center opacity-50">
            <div className="text-2xl mb-1">📝</div>
            <div className="text-xs">Notas Criativas</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsModalContent({
  setModalContent,
  modalContent,
}: {
  setModalContent: Dispatch<SetStateAction<string>>;
  modalContent: string;
}) {
  return (
    <div className="w-fit h-full pr-8 mr-5 flex flex-col gap-3 border-r-2 border-[var(--accent)] dark:border-[var(--darkAccent)]">
      <button className={`rounded-md w-fit ${modalContent === "theme" ? "border-b-2  border-[var(--accent)] dark:border-[var(--darkAccent)]" : ""}`} onClick={() => setModalContent("theme")}>Theme</button>
      {/* <button className="rounded-md w-fit" onClick={() => setModalContent("statistics")}>Statistics</button> */}
      <button className={`rounded-md w-fit ${modalContent === "about" ? "border-b-2 border-[var(--accent)] dark:border-[var(--darkAccent)]" : ""}`} onClick={() => setModalContent("about")}>About</button> 
    </div>
  );
}
function handleModalContent(content: string){
  switch(content){
    case "theme":
      return (
        <div>
          <ThemeSwitcher />
        </div>
      );
    case "statistics":
      return <Profile />;
    case "about":
      return <About />;
  }
}

export default function SettingsModal({
  openSettingsModal,
  setOpenSettingsModal,
}: SettingsModalProps) {
  const [modalContent, setModalContent] = useState<string>("theme");
  return (
    <div
      className={
        openSettingsModal
          ? "block content-center fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-[rgba(0,0,0,0.4)] backdrop-blur-sm"
          : "hidden"
      }
      onClick={() => setOpenSettingsModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col bg-[var(--background)] dark:bg-[var(--darkBackground)] w-[50%] h-[50%] mx-auto rounded-xl py-5 px-5 transform transition-all duration-300 animate-modal z-10"
      >
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl mb-5">Settings</h1>
          <button className="text-[#FF5C5C] font-bold max-w-fit py-2 px-2 rounded-lg hover:bg-[#FF5C5C22]" onClick={() => setOpenSettingsModal(false)}>X</button>
        </div>
        <div className="flex h-full">
          <SettingsModalContent setModalContent={setModalContent} modalContent={modalContent} />
          {handleModalContent(modalContent)}
        </div>
      </div>
    </div>
  );
}

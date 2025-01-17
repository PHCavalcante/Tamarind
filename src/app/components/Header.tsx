import { UserButton } from "@clerk/nextjs";
export default function Header(){
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();
    const weekDay = week[date.getDay()];
    return (
        <header className="flex w-full h-16 justify-between bg-[#F3EDED] content-center py-4 px-3 rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold pl-8">Tasks</h1> {/* Padding apenas para o icone do menu se encaixar no header quando o menu é ocultado */}
            <div className="flex items-center gap-3">
                <p className="font-semibold">{weekDay}</p>
                <UserButton />
            </div>
        </header>
    );
}
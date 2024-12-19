export default function DefaultTaskMenu(){
    return(
        <div className="relative w-full bg-[#F3EDED] py-[14px] px-3 shadow-lg shadow-gray-500/50">
            <div className="flex flex-col h-full items-center content-center justify-center gap-10">
                <h1 className="font-bold text-4xl">Welcome!</h1>
                <h2 className="font-bold text-xl">good to see you here</h2>
                <span className="font-bold text-5xl">(⌐■_■)</span>
                <p className="font-bold">Click on a task or list to view it</p>
                <p>oh?! don&apos;t have any? click on <strong>&quot;+&quot;</strong> to create a new one!</p>
            </div>
        </div>
    );   
}
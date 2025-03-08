export default function DefaultTaskMenu(){
    return (
      <div className="relative w-full h-full bg-[#F3EDED] py-[14px] px-3 shadow-lg shadow-gray-500/50">
        <div className="flex flex-col h-full items-center content-center justify-center gap-10">
          <h1 className="font-bold sm:text-lg md:text-xl lg:text-3xl">Welcome!</h1>
          <h2 className="font-bold text-sm md:text-lg lg:text-xl text-center">good to see you here</h2>
          <span className="font-bold text-2xl  md:text-2xl lg:text-5xl">(⌐■_■)</span>
          <p className="font-bold text-sm md:text-base text-center">Click on a task, note or list to view it</p>
          <p className="text-sm md:text-base text-gray-500 text-center">
            oh?! don&apos;t have any? click on &quot;
            <span className="font-black text-xl">+</span>&quot; to create a new one!
          </p>
        </div>
      </div>
    );   
}
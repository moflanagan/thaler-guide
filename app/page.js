export default function Home() {
  return (
   <main className="bg-white md:max-w-2xl mx-auto md:shadow-lg md:rounded-lg md:mt-8 overflow-hidden">
    <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-8">
      <h1 className="font-bold text-xl">Thaler Guide</h1>
      <p className="text-opacity-90 text-slate-700">A Repository for Thaler Resources</p>
    </div>

    <div className="bg-gray-100 px-8 py-2 flex">
      <div className="grow"></div>
      <div>
        <button className="bg-blue-500 py-1 px-4 rounded-md text-white">
        Create
        </button>
      </div>
    </div>
   </main>
  )
}

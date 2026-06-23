export default function Home() {
  return (
    <div className="px-8">
      <h1 className="text-3xl">KPB Litter App</h1>
      <p className="mt-2">
        Use this application to enter numbers from roadside litter
        and volunteer cleanups, and to view and modify previously
        entered litter data.
      </p>
      <div className="flex flex-row gap-2 mt-3">
        <button className="p-2 border-2">Data Entry</button>
        <button className="p-2 border-2">Data Viewer</button>
      </div>
    </div>
  );
}
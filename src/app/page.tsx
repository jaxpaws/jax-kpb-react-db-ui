export default function Home() {
  return (
    <div className="px-8">
      <h1 className="text-3xl" tabIndex={0}>KPB Litter App</h1>
      <p className="mt-2">
        WARD is your one-stop shop for reporting data.
        <br /><br />
        Navigate to the “Enter Data” tab to enter information about any KPB activities,
        including everything from roadside litter to adopt-a-spot cleanups to education events.
        <br /><br />
        Navigate to the “Visualize Metrics” tab to get metrics about KPB's activities by month, quarter, or year.
        <br /><br />
        Navigate to the “Search Events & Cleanups” tab to search for individual events
        and cleanups to view and to update or correct granular data.
      </p>
    </div>
  );
}
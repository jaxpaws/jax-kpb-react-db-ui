import Link from 'next/link';

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="px-8">
      <div className="flex flex-row items-center gap-4">
        <img
          src="/logo.png"
          alt="Keep Pensacola Beautiful logomark"
          width={80}
          height={80}
        />
        <h1 className="text-3xl">Web Application for Reporting Data (WARD)</h1>
      </div>
      <p className="mt-2 text-[1.06rem]">
        WARD is your one-stop shop for reporting data.
        <ul className="list-disc ml-4 mt-1">
          <li>
            enter information about&nbsp;
            <Link href="/enter-data/services" className="underline" aria-label="enter services activities">services activities</Link>
            &nbsp;like roadside litter and park routes,&nbsp;
            <Link href="/enter-data/services" className="underline" aria-label="enter volunteer cleanup activities">volunteer cleanup activities</Link>
            &nbsp;like group cleanups and adopt-a-spot cleanups, and&nbsp;
            <Link href="/enter-data/services" className="underline" aria-label="enter other activities">other activities</Link>
            &nbsp;like education events.
          </li>
          <li className="mt-1">
            <Link href="/enter-data/services" className="underline">get metrics about KPB's activities</Link>
            &nbsp;by month, quarter, or year, and
          </li>
          <li className="mt-1">
            <Link href="/enter-data/services" className="underline">search for individual events and cleanups</Link>
            &nbsp;to view and to update or correct granular data.
          </li>
        </ul>
      </p>
    </main>
  );
}
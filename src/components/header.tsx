import Link from "next/link";

export default function Header() {
    return (
        <div>
            <ul className="flex flex-row gap-8 items-center px-8 py-4 bg-[#092E6E]" >
                <li>
                    <Link href="/">
                        <img
                            src="/logo.png"
                            alt="Keep Pensacola Beautiful logomark"
                            width={80}
                            height={80}
                        />
                    </Link>
                </li>
                <li><Link className="text-xl text-[#F4E2A3]" href="/data-entry">
                    Data Entry
                </Link></li>
                <li><Link className="text-xl text-[#F4E2A3]" href="/">
                    Data Viewer
                </Link></li>
            </ul>
        </div>
    );
}
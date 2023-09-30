import Link from "next/link";

export default function Home() {
    return (
        <main className="flex justify-center text-2xl">
            <Link href="./login">Login</Link>
        </main>
    );
}

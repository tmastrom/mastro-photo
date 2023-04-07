
import Link from "next/link"

export default function Header() {
  return (
    <div className="fixed inset-x-0 top-100 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
      <div className="bg-gray-100">
      <header className="sticky top-0 z-30 w-full px-2 py-4 bg-white sm:px-4 shadow-xl">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <Link href="/" className="px-4 py-2 font-semibold text-gray-600 rounded">Thomas Mastromonaco</Link>
          <div className="flex items-center space-x-1">
            <ul>
              <Link href="/" className="px-4 py-2 font-semibold text-gray-600 rounded">Home</Link>
              {/* <Link href="/about" className="px-4 py-2 font-semibold text-gray-600 rounded">About</Link> */}
            </ul>
          </div>
        </div>
      </header>
    </div>
  </div>
  )
}

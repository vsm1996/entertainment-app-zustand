"use client"

import Image from "next/image"
import Link from "next/link"

import SiteLogo from "../icons/SiteLogo"
import HomeIcon from "../icons/HomeIcon"
import MovieIcon from "../icons/MovieIcon"
import TVIcon from "../icons/TVIcon"
import BookmarkNavIcon from "../icons/BookmarkNavIcon"
import { usePathname } from "next/navigation"

interface NavLinkProp {
  href: string
  icon: any
}

const Navbar = () => {
  const pathname = usePathname()

  const navLinks: NavLinkProp[] = [
    {
      href: "/",
      icon: <HomeIcon fill={pathname === "/" ? "#FFF" : undefined} />,
    },
    {
      href: "/movies",
      icon: <MovieIcon fill={pathname === "/movies" ? "#FFF" : undefined} />,
    },
    {
      href: "/tv-series",
      icon: <TVIcon fill={pathname === "/tv-series" ? "#FFF" : undefined} />,
    },
    {
      href: "/bookmarks",
      icon: <BookmarkNavIcon fill={pathname === "/bookmarks" ? "#FFF" : undefined} />,
    },
  ]

  return (
    <nav className="bg-blue-900 p-200 sm:m-200 sm:rounded-[10px] lg:rounded-[20px] flex flex-row md:flex-col lg:max-h-[960px] items-center justify-between">
      <div>
        <SiteLogo />
      </div>
      <ul className="flex flex-row items-center gap-300 md:flex-col">
        {navLinks &&
          navLinks.map(({ href, icon }, index) => (
            <li key={index} className="transition-all ease-in duration-300 hover:scale-110">
              <Link href={href}>{icon}</Link>
            </li>
          ))}
      </ul>
      <div className="overflow-hidden rounded-full border-2 border-white w-[32px] h-[32px] bg-blue-500">
        <Image src="/assets/image-avatar.jpg" alt="User avatar" width={32} height={32} />
      </div>
    </nav>
  )
}

export default Navbar

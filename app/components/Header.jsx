"use client";

import Link from "next/link";

import { useStyling } from "app/_utils/styling-context";

export default function header() {

    const {
        subheadingSize,
        subheadingWeight,
        textSize,
        textWeight,
        subtextSize,
        subtextWeight,
      } = useStyling();


    const NavBarButton = ({ children, onClick }) => {
        const handleOnClick = () => {
          if (onClick) onClick();
        };
    
        return (
          <button
            className={`text-black ${subtextSize} ${subtextWeight} px-10 py-2 active:bg-gray-50 rounded-sm hover:bg-white bg-gray-50`}
            onClick={handleOnClick}
          >
            {children}
          </button>
        );
      };

    return (
        <header className="flex justify-between border-b-2 px-24 mt-0">
            <NavBarButton>Home</NavBarButton>
            <div className="flex flex-row gap-5">
            <NavBarButton>Settings</NavBarButton>
            <Link href="/">
                <NavBarButton>Sign out</NavBarButton>
            </Link>
            </div>
        </header>
    )
}
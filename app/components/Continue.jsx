"use client";

import Link from 'next/link';

export default function Continue( {onClick} ) {
    const handleOnButtonClick = async () => {
        if (onClick)
            onClick();
    }
    
    return (
        <Link className="bg-[#606C38] p-4 flex justify-between gap-5 border-2 rounded-3xl hover:bg-[#283618] hover:text-white active cursor-pointer active:bg-[#606C38]"
              onClick={handleOnButtonClick}
              href="../pages/LandingPage">
            
            <p className="mt-auto mb-auto flex-1 text-gray-100 font-medium text-3xl text-center">
                Continue to the page
            </p>
        </Link>
    )
}
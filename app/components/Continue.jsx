"use client";

import Link from 'next/link';

export default function Continue( {onClick} ) {
    const handleOnButtonClick = async () => {
        if (onClick)
            onClick();
    }
    
    return (
        <Link className="bg-gray-50 p-4 flex justify-between gap-5 rounded-sm cursor-pointer hover:bg-white active:bg-gray-50"
              onClick={handleOnButtonClick}
              href="../pages/Home">
            
            <p className="mt-auto mb-auto flex-1 text-black font-medium text-3xl text-center">
                Continue
            </p>
        </Link>
    )
}
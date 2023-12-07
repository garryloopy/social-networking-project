"use client";

import Link from 'next/link';

import Subheading from './texts/Subheading';

export default function Continue( {onClick} ) {
    const handleOnButtonClick = async () => {
        if (onClick)
            onClick();
    }
    
    return (
        <Link className="bg-gray-50 p-4 flex justify-between gap-5 rounded-md cursor-pointer hover:bg-gray-200 active:bg-gray-50 shadow-2xl"
              onClick={handleOnButtonClick}
              href="../pages/Home">
            
            <div className="mt-auto mb-auto flex-1 text-black text-center">
                <Subheading>Continue</Subheading>
            </div>
        </Link>
    )
}
"use client";

import Link from "next/link";

import Text from "./texts/Text";
import Subtext from "./texts/Subtext";

import {
    useStyling
} from "../_utils/styling-context"

export default function User( {user, onUserHide} ) {
    const { textSize, textWeight } = useStyling();
    
    const handleOnUserHide = () => {
        
    }
    const debug = () => {
        console.log(user);
    }

    return (
        <section className="flex flex-col bg-gray-50 p-1 max-w-xs rounded-md gap-4 shadow-2xl">
            <div>
                <Link href={`users/${user.docId}`}>
                    <div className="flex flex-row gap-4 p-2 px-4 bg-emerald-300 hover:bg-emerald-400 active:bg-gray-300 rounded-sm hover:cursor-pointer shadow-md" onClick={debug}>
                        <img src={user.userInfo.photoURL} 
                                alt="User image" 
                                width={30}
                                height={30}
                                className="rounded-full border-2 border-neutral-400"/>
                        <div className="my-auto">
                            <Text>{user.userInfo.displayName}</Text>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
}
"use client";

import Text from "./texts/Text";
import Subtext from "./texts/Subtext";

import {
    useStyling
} from "../_utils/styling-context"

export default function User( {user, onUserHide} ) {
    const { textSize, textWeight } = useStyling();
    
    const handleOnUserHide = () => {
        
    }

    return (
        <section className="flex flex-col bg-gray-50 p-4 rounded-sm gap-4">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4 p-2 px-4 bg-gray-300 hover:bg-gray-400 active:bg-gray-300 rounded-sm hover:cursor-pointer">
                    <img src={user.userInfo.photoURL} 
                            alt="User image" 
                            width={60}
                            height={60}
                            className="rounded-full border-2 border-gray-500"/>
                    <div className="my-auto">
                        <Text>{user.userInfo.displayName}</Text>
                        <Subtext>{user.userInfo.bio}</Subtext>
                    </div>
                </div>
            </div>
        </section>
    );
}
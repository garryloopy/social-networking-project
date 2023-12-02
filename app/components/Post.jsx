"use client";

import Text from "./texts/Text";
import Subtext from "./texts/Subtext";

import {
    useStyling
} from "../_utils/styling-context"

export default function Post( {post, onPostHide} ) {
    const { textSize, textWeight } = useStyling();
    
    const handleOnPostHide = () => {
        if (onPostHide) onPostHide(post);
    }

    return (
        <section className="flex flex-col bg-gray-300 p-4 rounded-2xl gap-4">
            <div className="flex flex-row justify-between border-b-2 pb-4">
                <div className="flex flex-row gap-4 p-2 px-4 bg-gray-200 hover:bg-[#FEFAE0] rounded-2xl hover:cursor-pointer">
                    <img src={post.data.photoURL} 
                            alt="User image" 
                            width={60}
                            height={60}
                            className="rounded-full border-2 border-gray-500"/>
                    <div className="my-auto">
                        <Text>{post.data.displayName}</Text>
                        <Subtext>{post.data.timePosted}</Subtext>
                    </div>
                </div>
                <div className="my-auto">
                    <button className={`text-black ${textSize} ${textWeight} py-6 px-7 rounded-2xl hover:bg-[#FEFAE0] active:bg-white`}
                            onClick={handleOnPostHide}>
                        X
                    </button>
                </div>
            </div>
            <div>
                <Subtext>{post.data.contents}</Subtext>
            </div>
        </section>
    );
}
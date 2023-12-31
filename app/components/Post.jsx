"use client";

import Link from "next/link";

import Text from "./texts/Text";
import Subtext from "./texts/Subtext";

import {
    useStyling,
} from "../_utils/styling-context"

import {
    useState
} from "react";

export default function Post( {post} ) {
    const { textSize, textWeight } = useStyling();

    const [hidden, setHidden] = useState(false);    

    const handleOnPostHide = () => {
        setHidden(!hidden);
    }

    return (
        <section className={`flex flex-col bg-gray-50 px-4 pt-4 rounded-md ${!hidden ? "gap-4 pb-4" : ""} shadow-2xl w-full` }>
            <div className={`flex flex-row justify-between ${!hidden ? "border-b-2" : ""} pb-4`}>
                <Link href={`/pages/users/${post.data.userDocId}`} className="min-w-min">
                    <div className="flex flex-row gap-4 p-2 px-4 bg-sky-500 hover:bg-sky-400 active:bg-green-300 rounded-sm hover:cursor-pointer shadow-md">
                        <img src={post.data.photoURL} 
                                alt="User image" 
                                width={60}
                                height={60}
                                className="rounded-full border-2 border-blue-900"/>
                        <div className="my-auto">
                            <Text>{post.data.displayName}</Text>
                            <Subtext>{post.data.timePosted}</Subtext>
                        </div>
                    </div>
                </Link>


                <img src={hidden ? "https://cdn-icons-png.flaticon.com/128/4298/4298899.png" : "https://cdn-icons-png.flaticon.com/128/565/565655.png"} 
                                alt="User image" 
                                width={60}
                                height={60}
                                className={`py-2 my-2 px-2 rounded-lg hover:cursor-pointer hover:opacity-20 opacity-50`}
                                onClick={handleOnPostHide}/>

            </div>
            <div>
                {!hidden && 
                    <Subtext>{post.data.contents}</Subtext>
                }
            </div>
        </section>
    );
}
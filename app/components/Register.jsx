"use client";

import Text from "./texts/Text";
import Subtext from "./texts/Subtext"
import Subheading from "./texts/Subheading";

import { useStyling } from "../_utils/styling-context";
import { useState } from "react";


export default function Register( {user, onRegister} ) {
    const { subheadingSize, subheadingWeight, textSize, textWeight, subtextSize, subtextWeight } = useStyling();

    const [bioContents, setBioContents] = useState("");

    const handleOnRegisterClick = () => {
        if (onRegister) onRegister(bioContents);

        setBioContents("");
    }

    return (
        <section className="flex flex-col bg-gray-300 p-4 rounded-2xl gap-4">
            <div className="flex flex-row justify-between border-b-2 pb-4">
                <div className="flex flex-row gap-4">
                    <img src={user.photoURL} 
                            alt="User image" 
                            width={60}
                            height={60}
                            className="rounded-full border-2 border-gray-500"/>
                    <div className="my-auto">
                        <Text>{user.displayName}</Text>
                        <Subtext>{user.email}</Subtext>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center text-center gap-4">
                <Subheading>Bio</Subheading>
                <input type="text"
                    placeholder="Put something here... or not"
                    className={`rounded-2xl p-4 text-black ${subtextSize} ${subtextWeight}`}
                    value={bioContents}
                    onChange={(text) => setBioContents(text.target.value)}/>

                <div className="bg-white text-center rounded-2xl hover:bg-[#FEFAE0] hover:cursor-pointer active:bg-white w-full">
                    <button className={`text-black ${textSize} ${textWeight} p-4 w-full rounded-2xl`}
                            onClick={handleOnRegisterClick}>
                        Register
                    </button>
                </div>
            </div>
        </section>
    )
}
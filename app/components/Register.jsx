"use client";

import Text from "./texts/Text";
import Subtext from "./texts/Subtext"
import Subheading from "./texts/Subheading";

import { useStyling } from "../_utils/styling-context";
import { useState } from "react";


export default function Register( {user, onRegister} ) {
    const { subheadingSize, subheadingWeight, textSize, textWeight, subtextSize, subtextWeight } = useStyling();

    const [bioContents, setBioContents] = useState("");
    const [nameContents, setNameContents] = useState("");

    const handleOnRegisterClick = () => {
        if (onRegister) onRegister({
            bioContents: bioContents,
            nameContents: nameContents
        });

        setBioContents("");
        setNameContents("");
    }

    return (
        <section className="flex flex-col bg-gray-200 rounded-md gap-4 shadow-2xl">
            <div className="flex flex-row justify-between border-b-2 border-b-gray-400 p-6 shadow-md">
                <div className="flex flex-row gap-4">
                    <img src={user.photoURL} 
                            alt="User image" 
                            width={60}
                            height={60}
                            className="rounded-full border-2 border-gray-500"/>
                    <div className="my-auto">
                        <Subheading>{user.displayName}</Subheading>
                        <Subtext>{user.email}</Subtext>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center text-center gap-8 px-6 pb-6">
                <div className="flex flex-col">
                    <Text>Name</Text>
                    <input type="text"
                        placeholder="Name..."
                        className={`rounded-md p-4 text-black ${subtextSize} ${subtextWeight}text-center bg-gray-50 hover:bg-white active:bg-gray-50 shadow-lg`}
                        value={nameContents}
                        onChange={(text) => setNameContents(text.target.value)}/>
                </div>
                <div className="flex flex-col">
                    <Text>Bio</Text>
                    <input type="text"
                        placeholder="Put something here... or not"
                        className={`rounded-md p-4 text-black ${subtextSize} ${subtextWeight} text-center bg-gray-50 hover:bg-white active:bg-gray-50 shadow-lg`}
                        value={bioContents}
                        onChange={(text) => setBioContents(text.target.value)}/>
                </div>
                
                <div className="bg-gray-50 text-center rounded-md hover:bg-white hover:cursor-pointer active:bg-gray-50 w-full mt-2 shadow-lg">
                    <button className={`text-black ${textSize} ${textWeight} p-4 w-full rounded-sm`}
                            onClick={handleOnRegisterClick}>
                        Register
                    </button>
                </div>
            </div>
        </section>
    )
}
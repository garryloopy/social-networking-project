"use client";

import { useUserAuth } from "../_utils/auth-context";

import Subheading from "./texts/Subheading";

export default function Login( {onClick} ) {
    const { user, gitHubSignIn} = useUserAuth();

    const handleOnButtonClick = async () => {
        await gitHubSignIn();

        if (onClick)
            onClick();
    }
    
    return (
        <section className="bg-gray-400 p-2 flex justify-between gap-5 rounded-sm
                            hover:bg-gray-500 hover:text-white active cursor-pointer 
                            active:bg-gray-400 shadow-2xl"
                 onClick={handleOnButtonClick}>
            <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" 
                 alt="Github logo" 
                 width={60}
                 height={60}
                 className="rounded-sm m-1"/>
            
            <div className="mt-auto mb-auto flex-1">
                <Subheading>Login with GitHub</Subheading>
            </div>
        </section>
    )
}
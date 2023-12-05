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
        <section className="bg-[#606C38] p-2 flex justify-between gap-5 border-2 rounded-sm
                            hover:bg-[#283618] hover:text-white active cursor-pointer 
                            active:bg-[#606C38]"
                 onClick={handleOnButtonClick}>
            <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" 
                 alt="Github logo" 
                 width={60}
                 height={60}
                 className="rounded-sm flex-0"/>
            
            <p className="mt-auto mb-auto flex-1 text-gray-100 font-medium text-3xl">
                Login with GitHub
            </p>
        </section>
    )
}
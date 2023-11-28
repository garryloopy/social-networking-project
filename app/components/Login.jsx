"use client";

import { useUserAuth } from "../_utils/auth-context";

export default function Login( {onClick} ) {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    const handleOnButtonClick = async () => {
        await gitHubSignIn();
        onClick();
    }
    
    return (
        <section className="bg-slate-500 p-4 flex justify-between gap-5 border-2 rounded-3xl hover:bg-slate-600 hover:text-white active cursor-pointer active:bg-slate-500"
                 onClick={handleOnButtonClick}>
            <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" 
                 alt="Github logo" 
                 width={100}
                 height={100}
                 className="rounded-3xl flex-0"/>
            <p className="mt-auto mb-auto flex-1 text-4xl text-gray-100">
                Login with GitHub
            </p>
        </section>
    )
}
"use client";

import { useUserAuth } from "../_utils/auth-context";
import Login from "../components/Login";
import ProfilePage from "../components/ProfilePage";
import Signout from "../components/Signout";

export default function LandingPage() {
    const { user } = useUserAuth();

    return (
        <main>
            <div className="flex align-middle text-center">
                <div className="flex-1 mt-auto mb-auto py-20 px-8">
                    <p>This is a login/signout component</p>

                    {!user &&
                        <Login />
                    }

                    {user && 
                        <div className="flex justify-between">
                            <div className="flex flex-row gap-2 border-gray-800 border p-2 rounded-xl bg-gray-950 mt-2 mb-2">
                                
                                <img src={user.photoURL} className="w-8 h-8 rounded-full mt-auto mb-auto" alt="User image"/>
                                <div className="mt-auto mb-auto">
                                    <p className="text-sm">{user.displayName}</p>
                                    <p className="text-xs text-gray-400">{user.email}</p>
                                </div>
                            </div>
                            <div className="mt-auto mb-auto">
                                <Signout />
                            </div>
                            </div>
                    }
                    {user &&
                        <ProfilePage />
                    }
                    
                </div>
            </div>
        </main>
    )
}
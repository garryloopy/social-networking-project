"use client";

import {
    useState,
    useEffect
} from "react";

import { useUserAuth } from "../_utils/auth-context";

import {
    getAllUsers,
    createUser
} from "../_services/database-service"

import Login from "../components/Login";
import ProfilePage from "../components/ProfilePage";
import Signout from "../components/Signout";
import Post from "../components/Post";

export default function LandingPage() {
    const [users, setUsers] = useState([]);

    const { user } = useUserAuth();

    const loadUsers = async () => {
        const data = await fetchUsers();
        setUsers(data);
    }

    const handleOnClick = () => {
        loadUsers();
    }

    const debugButton = () => {
        console.log("debug button clicked");
        createUser(user.uid);

    }

    return (
        <main>
            <button className="p-8 bg-slate-800 hover:bg-slate-700 active:bg-slate-800"
                    onClick={debugButton}>
                debug button
            </button>
            <div className="flex align-middle text-center">
                <div className="flex  flex-col flex-1 mt-auto mb-auto py-20 px-8 gap-8">
                    <p>This is a login/signout component</p>
                    {!user &&
                        <div>
                            <Login onClick={handleOnClick}/>
                        </ div>
                    }

                    {user && 
                        <div className="flex justify-between">
                            <p>{user.uid}</p>
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
                        <div>
                            <p>this is a profile component</p>
                            <ProfilePage />
                        </ div>
                    }

                    {user &&
                        <div>
                            <p>This is a post component</p>
                            <Post user={user}/>
                        </ div>
                    }
                    
                </div>
            </div>
        </main>
    )
}
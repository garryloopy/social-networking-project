"use client";

import {
    useState,
    useEffect
} from "react";

import { useUserAuth } from "../_utils/auth-context";

import {
    getAllUsers,
    addUser
} from "../_services/database-service"

import Login from "../components/Login";
import ProfilePage from "../components/ProfilePage";
import Signout from "../components/Signout";
import Post from "../components/Post";

const fetchUsers = async () => {
    const data = await getAllUsers();
    return data;
}

export default function LandingPage() {
    const [users, setUsers] = useState([]);

    const { user } = useUserAuth();

    useEffect(
        () => {
            try {
                if (user) {
                    console.log("Loading users");
                    loadUsers();
                }
            } catch (error) {
                console.log("Error: ", error);
                console.log("Something went wrong with loading users");
            }
            
        }, [user]
    )

    useEffect(
        () => {
            try{

            } catch (error) {
                console.log("Error: ", error);
                console.log("Something went wrong with adding user")
            }
        }, [users]
    )

    if (user) console.log("Logged in successfully");
    if (users) console.log(users);

    const loadUsers = async () => {
        const data = await fetchUsers();
        setUsers(data);
    }

    const handleOnClick = () => {
        loadUsers();

    }

    return (
        <main>
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
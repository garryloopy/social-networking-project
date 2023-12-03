"use client";


import { useUserAuth } from "app/_utils/auth-context.js";

import Login from "app/components/Login";
import Heading from "app/components/texts/Heading";
import Subheading from "app/components/texts/Subheading";
import Continue from "app/components/Continue";

import Register from "@/app/components/Register";


import { useEffect, useState } from "react";
import { getAllUsers, createUser } from "@/app/_services/database-service";
import Subtext from "@/app/components/texts/Subtext";


export default function LoginPage() {
    const { user } = useUserAuth();

    const [availableUsers, setAvailableUsers] = useState([]);

    const loadUsers = async () => {
      try {
          const users = await getAllUsers();
          setAvailableUsers(users);
      } catch (error) {
          console.error("Error loading users:", error);
      }
  };
  

    useEffect(
      () => {
        loadUsers();
      }, []
    )

    const debug = async () => {
          console.log("Available Users:", availableUsers);
  };
  
  const handleOnRegister = async (bio) => {
    try {
        const docRef = await createUser(user, bio);

        setAvailableUsers((prevUsers) => [
            ...prevUsers,
            {
                docId: docRef,
                userInfo: {
                    userId: user.uid,
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                    bio: bio,
                },
            },
        ]);
    } catch (error) {
        console.error("Error registering user", error);
    }
};

    
    return (
      <div className="flex flex-col min-h-screen justify-center items-center gap-10">
        <Heading>
            Welcome to ConnectHub.
        </Heading>
        <button className="text-black"
                onClick={debug}>
          debug
        </button>

        <div className="flex flex-col gap-2">
            <Subheading>
                {user ? `Welcome, ${user.displayName}` : "To get started, login with GitHub."}
            </Subheading>

            {!user &&
              <Login/>
            }
            {user && availableUsers.some((currentUser) => currentUser.userInfo.userId === user.uid) &&
              <Continue />
            }
            {user && !availableUsers.some((currentUser) => currentUser.userInfo.userId === user.uid) &&
              <div>
                <Subtext>It seems like you're new here...</Subtext>
                <Register user={user} onRegister={handleOnRegister}/>
              </div>
            }

        </div>
      </div>
    );
  }
  
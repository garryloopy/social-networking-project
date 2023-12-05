"use client";

import {
  useState,
  useEffect
} from "react";

import Login from "app/components/Login";
import Heading from "app/components/texts/Heading";
import Subheading from "./components/texts/Subheading";
import ContinueSection from "./components/sections/ContinueSection";
import RegisterSection from "./components/sections/RegisterSection";
import LoginSection from "./components/sections/LoginSection";

import {
  getAllUsers,
  createUser
} from "./_services/database-service";
import { 
  useUserAuth
} from "app/_utils/auth-context.js";


export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();

  const [availableUsers, setAvailableUsers] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);

  const checkIfUserInDatabase = () => {
    const foundUser = availableUsers.filter((currentUser) => currentUser.userInfo.userId === user.uid);
    return foundUser[0];
  }

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setAvailableUsers(data);
    } catch (error) {
      console.log("Error loading users", error);
    }
  }

  const createNewUser = async (user, contents) => {
    try {
      const docRef = await createUser(user, contents);

      const newUserObj = {
        docId: docRef,
        userInfo: {
          userId: user.uid,
          photoURL: user.photoURL,
          displayName: contents.nameContents,
          bio: contents.bioContents,
        }
      }

      setCurrentUser(newUserObj);
      setAvailableUsers([
        ...availableUsers,
        newUserObj
      ])
    } catch (error) {
      console.log("Error creating new user", error);
    }

  };

  useEffect(
    () => {
      loadUsers();
    }, [user]
  );

  useEffect(
    () => {
      if (!user) return;

      const potentialUser = checkIfUserInDatabase();

      if (!potentialUser) return;

      if (potentialUser.userInfo.userId === user.uid)
        setCurrentUser(potentialUser);
    }, [availableUsers]
  )

  useEffect(
    () => {
      firebaseSignOut();
    }, []
  )

  const handleOnRegister = (contents) => {
    createNewUser(user, contents);
  }


  return (
    <div className="flex flex-col justify-center flex-1 min-h-screen items-center">
      <div className="flex-1 flex justify-center items-center">
        <Heading>Welcome to ConnectHub</Heading>
        
      </div>
      <div className="flex flex-1 flex-col justify-start items-start">
        {!user && <LoginSection />}
        {availableUsers && user && !currentUser && <RegisterSection user={user} onRegister={handleOnRegister}/>}
        {availableUsers && user && currentUser && <ContinueSection currentUser={currentUser}/>}
      </div>
    </div>
  );
}

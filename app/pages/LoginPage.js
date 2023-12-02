"use client";


import { useUserAuth } from "../_utils/auth-context";
import Login from "../components/Login";
import Heading from "../components/texts/Heading";
import Subheading from "../components/texts/Subheading";



export default function LoginPage() {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center gap-10">
        <Heading>
            Welcome to ConnectHub.
        </Heading>

        <div className="flex flex-col gap-2">
            <Subheading>
                To get started, login with GitHub.
            </Subheading>
            <Login/>
        </div>
      </div>
    );
  }
  
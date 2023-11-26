
import { useUserAuth } from "../_utils/auth-context";

{/* <img src={user.photoURL} className="w-8 h-8 rounded-full mt-auto mb-auto" alt="User image"/>
<div className="mt-auto mb-auto">
    <p className="text-sm">{user.displayName}</p>
    <p className="text-xs text-gray-400">{user.email}</p>
</div> */}

export default function ProfilePage() {
    const { user } = useUserAuth();

    return (
        <section className="border-2 flex text-center justify-center align-middle p-4 rounded-3xl">
            {user && 
                <div>
                    <img src={user.photoURL} 
                        alt="Profile Picture" 
                        className="rounded-full"
                        width={300}
                        height={300}/>
                    <h1 className="text-4xl font-bold">{user.displayName}</h1>
                    <p className="text-2xl">{user.email}</p>
                    <p className="text-2xl">Location</p>
                    <p className="text-2xl">Followers</p>
                    <p className="text-2xl">Following</p>
                </div>
            }

            {!user && 
                <div>
                    <P>Error loading user info</P>
                </div>
            }
            
        </section>
    )
}
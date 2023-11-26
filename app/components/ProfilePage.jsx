export default function ProfilePage() {
    return (
        <section className="border-2 flex text-center justify-center align-middle p-4 rounded-3xl">
            <div>
                <img src="https://picsum.photos/300/300" 
                     alt="Profile Picture" 
                     className="rounded-full"/>
                <h1 className="text-4xl font-bold">Name</h1>
                <p className="text-2xl">Bio</p>
                <p className="text-2xl">Location</p>
                <p className="text-2xl">Followers</p>
                <p className="text-2xl">Following</p>
            </div>
        </section>
    )
}
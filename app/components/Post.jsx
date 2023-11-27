
{/* <img src={user.photoURL} className="w-8 h-8 rounded-full mt-auto mb-auto" alt="User image"/>
<div className="mt-auto mb-auto">
    <p className="text-sm">{user.displayName}</p>
    <p className="text-xs text-gray-400">{user.email}</p>
</div> */}

export default function Post( {user} ) {
    return (
        <div className="flex border-2 flex-col bg-gray-950 p-2 gap-4">

            <div className="flex justify-between border-b-2 pb-2 border-gray-500">
                <div className="flex flex-row gap-3">
                    <img src={user.photoURL} 
                         alt="User image" 
                         width={100}
                         height={100}
                         className="rounded-full border-2 border-gray-500"/>
                    <div className="mb-auto mt-2 text-left">
                        <p>{user.displayName}</p>
                        <p className="text-gray-500">11/27/2023</p>
                    </div>
                </div>
                <div className="flex flex-row gap-2 mb-auto text-2xl">
                    <button>
                        ...
                    </button>
                    <button>
                        X
                    </button>
                </div>
            </div>
            <div>
                <p className="text-left">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit voluptatem sequi similique aut. Necessitatibus dicta corrupti quam nesciunt deleniti dolor, magnam eaque dolores, porro natus aliquid veniam, excepturi blanditiis officia.
                </p>
            </div>
        </div>
    )
}
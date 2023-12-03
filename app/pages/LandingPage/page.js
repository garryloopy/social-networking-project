"use client";

import { useUserAuth } from "app/_utils/auth-context";
import { useStyling } from "app/_utils/styling-context";

import Heading from "app/components/texts/Heading";
import Subheading from "app/components/texts/Subheading";
import Text from "app/components/texts/Text";
import Subtext from "app/components/texts/Subtext";
import Post from "app/components/Post";
import { useEffect, useState } from "react";

import {
    getAllPosts,
    createPost,
    getAllUsers,
    createUser
} from "app/_services/database-service"
import Link from "next/link";

export default function LandingPage() {
    const { user } = useUserAuth();
    const { subheadingSize, subheadingWeight, textSize, textWeight, subtextSize, subtextWeight } = useStyling();

    const [availablePosts, setAvailablePosts] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);

    const [postContents, setPostContents] = useState("");

    const loadPosts = async () => {
        try {
            const posts = await getAllPosts();

            setAvailablePosts(posts);
        } catch (error) {
            console.log("Error loading posts", error);
        }
    }

    const loadUsers = async () => {
        try {
            const users = await getAllUsers();
    
            setAvailableUsers(users);
    
            // Check if the user is in the database
            const userExists = users.some((currentUser) => currentUser.userInfo.userId === user.uid);
    
            if (!userExists) {
                console.log("creating user");
                // If not, create the user
                const docRef = await createUser(user);
                
                // Update the state with the new user information
                setAvailableUsers((prevUsers) => [
                    ...prevUsers,
                    {
                        docId: docRef,
                        userInfo: {
                            userId: user.uid,
                            photoURL: user.photoURL,
                            displayName: user.displayName,
                            bio: "",
                        },
                    },
                ]);
            }
        } catch (error) {
            console.log("Error loading users", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await loadPosts();
            await loadUsers();
        };
    
        fetchData();
    }, []);

    const [allowAddPost, setAllowAddPost] = useState(true);

    const handleOnAllowAddPostButtonClick = () => {
        setAllowAddPost(false);
    }

    const generatePostObj = () => {
        const timePosted = getTimePosted();

        const postObj = {
            userId: user.uid,
            photoURL: user.photoURL,
            displayName: user.displayName,
            timePosted: timePosted,
            contents: postContents
        }

        return postObj;
    }

    const getTimePosted = () => {
        // Create a new Date object
        var currentDate = new Date();

        // Get individual components of the date
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
        var day = currentDate.getDate();


        return year + "-" + month + "-" + day;

    }

    const handleAddPost = async () => {
        const postObj = generatePostObj();

        const docRef = await createPost(postObj);

        setPosts(
            [...posts,
                {
                    docId: docRef,
                    data: postObj
                }
            ]
        )

        setPostContents("");
    }

    const handleOnAddPost = () => {
        handleAddPost();

        setAllowAddPost(true);
    }

    const handleOnPostButtonCloseClick = () => {
        setAllowAddPost(true);
    }

    const handleOnPostHide = (post) => {
        setPosts(posts.filter((currentPost) => currentPost.docId != post.docId))
    }

    const NavBarButton = ({children, onClick}) => {
        const handleOnClick = () => {
            if (onClick) onClick();
        }

        return (
            <button className={`text-black ${subtextSize} ${subtextWeight} bg-gray-200 px-8 py-2 active-bg-white rounded-2xl hover:bg-[#FEFAE0]`}
                    onClick={handleOnClick}>
                        {children}
            </button>
        )
    }

    const handleDebug = () => {
        console.log(availableUsers);
    }

    return (
        <div className="min-h-screen flex flex-col gap-4">
            <header className="flex justify-between border-b-2 py-2 px-24 mt-0">
                <NavBarButton>Home</ NavBarButton>
                <NavBarButton onClick={handleDebug}>Debug</ NavBarButton>
                <div className="flex flex-row gap-5">
                    <NavBarButton>Settings</ NavBarButton>
                    <Link href="/">
                        <NavBarButton>Sign out</ NavBarButton>
                    </Link>
                </div>
            </header>

            <main className="flex flex-col px-20 border-b-2 gap-8 pb-2">
                <div className="mx-4">
                    {allowAddPost &&
                        <section className="flex flex-row bg-gray-300 p-4 rounded-2xl gap-4">
                            <img src={user.photoURL} 
                                    alt="User image" 
                                    width={60}
                                    height={60}
                                    className="rounded-full border-2 border-gray-500"/>
                            <div className="bg-white text-center rounded-2xl hover:bg-[#FEFAE0] hover:cursor-pointer active:bg-white w-full">
                                <button className={`text-black ${textSize} ${textWeight} p-4 w-full rounded-2xl`}
                                        onClick={handleOnAllowAddPostButtonClick}>
                                    Add a post
                                </button>
                            </div>
                        </section>
                    }
                    {!allowAddPost &&
                        <section className="flex flex-col bg-gray-300 p-4 rounded-2xl gap-4">
                            <div className="flex flex-row justify-between border-b-2 pb-4">
                                <div className="flex flex-row gap-4">
                                    <img src={user.photoURL} 
                                            alt="User image" 
                                            width={60}
                                            height={60}
                                            className="rounded-full border-2 border-gray-500"/>
                                    <div className="my-auto">
                                        <Text>{user.displayName}</Text>
                                        <Subtext>{user.email}</Subtext>
                                    </div>
                                </div>
                                <div className="my-auto">
                                    <button className={`text-black ${textSize} ${textWeight} py-4 px-5 rounded-2xl hover:bg-[#FEFAE0] active:bg-white`}
                                            onClick={handleOnPostButtonCloseClick}>
                                        X
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center text-center gap-4">
                                <Subheading>Create a post</Subheading>
                                <input type="text"
                                    placeholder="What do you want to share?"
                                    className={`rounded-2xl p-4 text-black ${subtextSize} ${subtextWeight}`}
                                    value={postContents}
                                    onChange={(change) => setPostContents(change.target.value)}/>

                                <div className="bg-white text-center rounded-2xl hover:bg-[#FEFAE0] hover:cursor-pointer active:bg-white w-full">
                                    <button className={`text-black ${textSize} ${textWeight} p-4 w-full rounded-2xl`}
                                            onClick={handleOnAddPost}>
                                        Add post
                                    </button>
                                </div>
                            </div>
                        </section>
                    }      
                </div>

                <div className="flex flex-col gap-12 mx-4">
                    <Heading>Discover</Heading>
                    <section className="flex flex-col gap-2">
                        <Subheading>Posts</Subheading>

                        {availablePosts &&
                            availablePosts.map(
                                (post) => (
                                    <Post post={post} key={post.docId} onPostHide={handleOnPostHide}/>
                                )
                            )
                        }

                        {availablePosts.length === 0 &&
                            <Text>There are currently no posts available... why not add some?</Text>
                        }
                    </section>

                    <section className="flex flex-col gap-2">
                        <Subheading>Users</Subheading>
                    </section>
                </div>
            </main>

            <footer className="mb-0 mt-auto text-center">
                <Subtext>You've reached the end of the page.</Subtext>
            </footer>
        </div>
    )
}
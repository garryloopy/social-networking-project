"use client";

import { useUserAuth } from "../_utils/auth-context";
import { useStyling } from "../_utils/styling-context";

import Heading from "../components/texts/Heading";
import Subheading from "../components/texts/Subheading";
import Text from "../components/texts/Text";
import Subtext from "../components/texts/Subtext";
import Post from "../components/Post";
import { useEffect, useState } from "react";

import {
    getAllPosts,
    createPost
} from "../_services/database-service"

export default function LandingPage() {
    const { user, firebaseSignOut } = useUserAuth();
    const { subheadingSize, subheadingWeight, textSize, textWeight, subtextSize, subtextWeight } = useStyling();

    const [posts, setPosts] = useState([]);

    const [postContents, setPostContents] = useState("");

    const loadPosts = async () => {
        try {
            console.log("Fetching posts");
            const posts = await getAllPosts();

            setPosts(posts);
        } catch (error) {
            console.log("Error loading posts", error);
        }
    }

    useEffect(
        () => {
            loadPosts();
        }, [user]
    )

    const [allowAddPost, setAllowAddPost] = useState(true);

    const handleSignOut = () => {
        firebaseSignOut();
    }

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
        console.log(posts);
        // getAllPosts();
    }

    return (
        <div className="min-h-screen flex flex-col gap-4">
            <header className="flex justify-between border-b-2 py-2 px-4 mt-0">
                <NavBarButton>Home</ NavBarButton>
                <NavBarButton onClick={handleDebug}>Debug</ NavBarButton>
                <div className="flex flex-row gap-5">
                    <NavBarButton>Settings</ NavBarButton>
                    <NavBarButton onClick={handleSignOut}>Sign out</ NavBarButton>
                </div>
            </header>

            <main className="flex flex-col border-b-2 gap-8 pb-2">
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

                <div className="flex flex-col gap-6 mx-4">
                    <Heading>Discover</Heading>
                    <section className="flex flex-col gap-2">
                        <Subheading>Posts</Subheading>

                        {posts &&
                            posts.map(
                                (post) => (
                                    <Post post={post} key={post.docId} onPostHide={handleOnPostHide}/>
                                )
                            )
                        }

                        {!posts &&
                            <Subheading>There are currently no posts available...</Subheading>
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
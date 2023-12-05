"use client";

import { useUserAuth } from "app/_utils/auth-context";

import { useState, useEffect } from "react";

import {
    getAllPosts,
    createPost,
    getAllUsers,
  } from "app/_services/database-service";

import Heading from "./texts/Heading";
import Subheading from "./texts/Subheading";
import Post from "./Post";
import Text from "./texts/Text";
import CreatePostFormSection from "./sections/CreatePostFormSection";
import CreatePostSection from "./sections/CreatePostSection";

import User from "./User";

export default function Main() {
    const { user } = useUserAuth();

    const [availablePosts, setAvailablePosts] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
  
    const loadCurrentUser = () => {
      if (!user) return;
  
      const foundUser = availableUsers.filter(
        (potentialUser) => potentialUser.userInfo.userId === user.uid
      );
  
      if (foundUser) setCurrentUser(foundUser[0]);
      else setCurrentUser([]);
    };
  
    const loadPosts = async () => {
      try {
        const posts = await getAllPosts();
  
        setAvailablePosts(posts);
      } catch (error) {
        console.log("Error loading posts", error);
      }
    };
  
    const loadUsers = async () => {
      try {
        const users = await getAllUsers();
  
        setAvailableUsers(users);
      } catch (error) {
        console.log("Error loading users", error);
      }
    };
  
    useEffect(() => {
      try {
        loadPosts();
        loadUsers();
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }, []);
  
    useEffect(() => {
      try {
        loadCurrentUser();
      } catch (error) {
        console.log("Error loading current user", error);
      }
    }, [availableUsers]);
  
    const [allowAddPost, setAllowAddPost] = useState(true);
  
    const handleOnAllowAddPostButtonClick = () => {
      setAllowAddPost(false);
    };
  
    const handleOnAddPost = async (postObj) => {
      const docRef = await createPost(postObj);
  
      setAvailablePosts([
        ...availablePosts,
        {
          docId: docRef,
          data: postObj,
        },
      ]);
  
      setAllowAddPost(true);
    };
  
    const handleOnPostButtonCloseClick = () => {
      setAllowAddPost(true);
    };

    return (
        <main className="flex flex-col px-20 border-b-2 gap-8 pb-2">
        <div className="mx-4">
          {user && allowAddPost && (
            <CreatePostSection
              onAllowAddPostButtonClick={handleOnAllowAddPostButtonClick}
            />
          )}
          {user && !allowAddPost && (
            <CreatePostFormSection
              onClose={handleOnPostButtonCloseClick}
              currentUser={currentUser}
              onAddPost={handleOnAddPost}
            />
          )}
        </div>

        <div className="flex flex-col gap-12 mx-4">
          <Heading>Discover</Heading>
          <section className="flex flex-col gap-2">
            <Subheading>Posts</Subheading>

            {availablePosts &&
              availablePosts.map((post) => (
                <Post post={post} key={post.docId} />
              ))}

            {availablePosts.length === 0 && (
              <Text>
                There are currently no posts available... why not add some?
              </Text>
            )}
          </section>

          <section className="flex flex-col gap-2">
            <Subheading>Users</Subheading>
            {availableUsers &&
              user &&
              availableUsers
                .filter(
                  (currentUser) => currentUser.userInfo.userId !== user.uid
                )
                .map((currentUser) => (
                  <div key={currentUser.userInfo.userId}>
                    <User user={currentUser} />
                  </div>
                ))}
          </section>
        </div>
      </main>
    )
}
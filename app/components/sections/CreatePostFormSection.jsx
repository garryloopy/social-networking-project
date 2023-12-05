"use client";

import {
    useUserAuth
} from "@/app/_utils/auth-context";

import {
    useStyling
} from "@/app/_utils/styling-context"

import {
    useState
} from "react";

import Text from "../texts/Text";
import Subtext from "../texts/Subtext";
import Subheading from "../texts/Subheading";

export default function CreatePostFormSection ({onClose, currentUser, onAddPost}) {
    const [postContents, setPostContents] = useState("");

    const { user } = useUserAuth();
    const {
        subheadingSize,
        subheadingWeight,
        textSize,
        textWeight,
        subtextSize,
        subtextWeight,
      } = useStyling();

      const generatePostObj = () => {
        const timePosted = getTimePosted();
    
        const postObj = {
          userId: user.uid,
          photoURL: user.photoURL,
          displayName: currentUser.userInfo.displayName,
          timePosted: timePosted,
          contents: postContents,
        };
    
        return postObj;
      };

      const getTimePosted = () => {
        // Create a new Date object
        var currentDate = new Date();
    
        // Get individual components of the date
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
        var day = currentDate.getDate();
        var hours = currentDate.getHours();
        var minutes = currentDate.getMinutes();
        var seconds = currentDate.getSeconds();
    
        // Format the date
        var formattedDate = `${year}-${month}-${day}`;
    
        // Format the time in 12-hour clock with AM/PM
        var amPm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert 0 to 12
        var formattedTime = `${hours}:${minutes}:${seconds} ${amPm}`;
    
        // Combine date and time
        var dateTimePosted = `${formattedDate} at ${formattedTime}`;
    
        return dateTimePosted;
      };


      const handleOnAddPost = () => {
        const postObj = generatePostObj()

        onAddPost(postObj);

        setPostContents("");
      }

    return (
        <section className="flex flex-col bg-gray-50 p-4 rounded-sm gap-4 shadow-2xl">
        <div className="flex flex-row justify-between border-b-2 pb-4">
          <div className="flex flex-row gap-4">
            <img
              src={user.photoURL}
              alt="User image"
              width={60}
              height={60}
              className="rounded-full border-2 border-gray-500"
            />
            <div className="my-auto">
              <Text>{currentUser.userInfo.displayName}</Text>
              <Subtext>{user.email}</Subtext>
            </div>
          </div>
          <div className="my-auto">
            <button
              className={`bg-gray-300 text-black ${textSize} ${textWeight} py-4 px-5 rounded-sm hover:bg-gray-400 active:bg-white shadow-md`}
              onClick={onClose}
            >
              X
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-6 text-start">
          <div className="flex flex-col gap-2">
            <Text>Create a post</Text>
            <input
                type="text"
                placeholder="What do you want to share?"
                className={`rounded-sm py-4 bg-gray-300 px-2 border-2 text-black border-gray-300 ${subtextSize} ${subtextWeight} shadow-md`}
                value={postContents}
                onChange={(change) => setPostContents(change.target.value)}
            />
          </div>

          <div className="bg-gray-300 text-center rounded-sm hover:bg-gray-400 hover:cursor-pointer active:bg-gray-300 w-full shadow-md">
            <button
              className={`text-black ${subtextSize} ${subtextWeight} p-4 w-full rounded-sm`}
              onClick={handleOnAddPost}
            >
              Add post
            </button>
          </div>
        </div>
      </section>
    )
  }
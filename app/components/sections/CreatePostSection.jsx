import { useStyling } from "@/app/_utils/styling-context";
import { useUserAuth } from "@/app/_utils/auth-context";

export default function CreatePostSection({onAllowAddPostButtonClick}) {
    const {
        subheadingSize,
        subheadingWeight,
        textSize,
        textWeight,
        subtextSize,
        subtextWeight,
      } = useStyling();

    const { user } = useUserAuth();

    return (
        <section className="flex flex-row bg-gray-50 p-4 rounded-md gap-4 shadow-2xl">
            <img
            src={user.photoURL}
            alt="User image"
            width={60}
            height={60}
            className="rounded-full border-2 border-blue-900"
            />
            <div className="bg-sky-400 text-center rounded-md hover:bg-sky-300 hover:cursor-pointer active:bg-gray-300 w-full">
            <button
                className={`text-black ${textSize} ${textWeight} p-4 w-full rounded-sm shadow-md`}
                onClick={onAllowAddPostButtonClick}
            >
                Add a post
            </button>
            </div>
        </section>
    )
  }
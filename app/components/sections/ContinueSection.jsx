import Continue from "../Continue";
import Subheading from "../texts/Subheading";

export default function ContinueSection({currentUser}) {
    const { displayName } = currentUser.userInfo;
    return (
      <div className="flex flex-col gap-2">
        <Subheading>Welcome, {displayName}</Subheading>
        <Continue />
      </div>
    );
  }
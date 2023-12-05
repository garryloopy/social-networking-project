import Login from "../Login";
import Subheading from "../texts/Subheading";

export default function LoginSection() {
    return (
      <div className="flex flex-col gap-2">
        <Subheading>To get started, login with GitHub</Subheading>
        <Login/>
      </div>
    );
  };
import Subheading from "../texts/Subheading";
import Register from "../Register";

export default function RegisterSection ({user, onRegister}) {
    return (
      <div className="flex flex-col gap-2">
        <Subheading>It seems like you are new here...</Subheading>
        <Register user={user} onRegister={onRegister}/>
      </div>
    );
  }
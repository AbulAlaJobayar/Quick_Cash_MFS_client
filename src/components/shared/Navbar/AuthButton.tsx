import logoutUser from "@/service/action/logoutUser";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const router = useRouter();
  const handleLogout = () => {
    logoutUser(router);
  };
  return (
    <>
      <button
        onClick={handleLogout}
        className="flex items-center w-full p-2 hover:bg-accent rounded-lg"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </button>
    </>
  );
};

export default AuthButton;

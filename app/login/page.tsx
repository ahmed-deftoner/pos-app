import { authOptions } from "@/auth/authOptions";
import LoginContainer from "@/containers/Login/Login.container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  // const session = await getServerSession(authOptions);

  // if (session) {
  //   redirect("/products");
  // }

  return <LoginContainer />;
}

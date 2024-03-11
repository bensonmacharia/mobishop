import { LoginForm } from "@/components/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Login() {
  const token = cookies().get("mobiapp-session")?.value;
  if (token) {
    redirect("/");
  }
  //console.log("Cookie: " + token);
  return (
    <section className="bg-gray-100 py-8">
      <div className="flex flex-col justify-center items-center px-6 py-6 mx-auto min-h-[calc(100vh-4rem)] lg:py-0">
        <LoginForm />
      </div>
    </section>
  );
}

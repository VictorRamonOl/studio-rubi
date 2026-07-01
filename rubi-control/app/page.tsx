import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/dal";

// Raiz: roteia por papel. (Não-logado já foi barrado pelo middleware.)
export default async function Home() {
  const user = await getCurrentUser();
  if (user.role === "admin") redirect("/admin/dashboard");
  redirect("/cliente/dashboard");
}

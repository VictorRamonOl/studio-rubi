import Link from "next/link";
import { LoginForm } from "./login-form";
import { InstallPWAButton } from "@/components/install-pwa-button";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl text-wine">Studio Rubi</h1>
          <p className="mt-1 text-sm text-muted">Acesso restrito</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <LoginForm next={next ?? null} />
        </div>

        <p className="mt-4 text-center text-sm">
          <Link href="/recuperar-senha" className="text-wine hover:underline">
            Esqueci minha senha
          </Link>
        </p>

        <div className="mt-6">
          <InstallPWAButton />
        </div>
      </div>
    </main>
  );
}

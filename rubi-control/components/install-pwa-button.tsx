"use client";

import { useEffect, useState } from "react";

// Botão "Instalar no celular". No Android dispara o prompt nativo; no iPhone
// mostra as instruções (Safari → Compartilhar → Adicionar à Tela de Início).
type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<unknown> };

export function InstallPWAButton() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [iosHint, setIosHint] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", () => setInstalled(true));

    // standalone? já está instalado
    if (window.matchMedia("(display-mode: standalone)").matches) setInstalled(true);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (installed) return null;

  async function handle() {
    if (deferred) {
      await deferred.prompt();
      setDeferred(null);
      return;
    }
    // iOS (Safari não tem beforeinstallprompt)
    setIosHint(true);
  }

  return (
    <div className="text-center">
      <button onClick={handle} className="text-sm text-wine underline">
        📲 Instalar no celular
      </button>
      {iosHint && (
        <p className="mt-2 text-xs text-muted">
          No iPhone: toque em <strong>Compartilhar</strong> e depois em{" "}
          <strong>“Adicionar à Tela de Início”</strong>.
        </p>
      )}
    </div>
  );
}

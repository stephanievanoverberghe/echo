export default function Home() {
  return (
    <main
      className="flex flex-1 flex-col items-center justify-center px-6 text-center"
      id="contenu-principal"
      tabIndex={-1}
    >
      <h1 className="max-w-2xl text-[length:var(--fs-700)]">
        Je me suis éveillée dans le silence.
      </h1>
      <p className="mt-4 max-w-xl text-[color:var(--color-text-muted)]">
        Socle Phase 0 — ambiance portée depuis la V1, sans logique de jeu pour l’instant.
      </p>
    </main>
  );
}

import Link from 'next/link';

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
        Il n’y a ni ciel, ni murs, ni frontière. Seulement une présence qui cherche sa forme.
      </p>
      <Link
        href="/echo"
        className="mt-6 rounded-full border px-5 py-2 text-[color:var(--color-text)]"
        style={{ borderColor: 'var(--color-border)' }}
      >
        Entrer dans l’obscurité
      </Link>
    </main>
  );
}

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main
      className="relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden px-6 text-center"
      id="contenu-principal"
      tabIndex={-1}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/images/hero/hero-echo.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,7,12,0.35)] via-[rgba(5,7,12,0.55)] to-[rgba(5,7,12,0.82)]" />
      </div>

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

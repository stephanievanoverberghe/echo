'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
    { href: '/echo', label: 'Echo' },
    { href: '/journal', label: 'Journal' },
    { href: '/artefacts', label: 'Artefacts' },
    { href: '/carte', label: 'Carte' },
] as const;

export default function NavigationPanel() {
    const pathname = usePathname();

    // Écran d'entrée : on préserve l'immersion, pas de navigation.
    if (pathname === '/') return null;

    return (
        <nav
            aria-label="Navigation secondaire"
            className="flex flex-wrap justify-center gap-4 py-4 text-[length:var(--fs-300)]"
        >
            {LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="nav-link"
                        aria-current={isActive ? 'page' : undefined}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}

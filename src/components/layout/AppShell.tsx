'use client';

import type { ReactNode } from 'react';
import AmbientLayers from './AmbientLayers';
import NavigationPanel from './NavigationPanel';

export default function AppShell({ children }: { children: ReactNode }) {
    return (
        <>
            <a className="skip-link" href="#contenu-principal">
                Aller au contenu principal
            </a>
            <AmbientLayers />
            <NavigationPanel />
            {children}
        </>
    );
}

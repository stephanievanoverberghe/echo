import type { Zone } from '@/content/zones';

export default function ZoneCard({ zone }: { zone: Zone }) {
    return (
        <article
            className="rounded-[var(--radius-md)] border p-5"
            style={{ borderColor: 'var(--color-border)' }}
        >
            <h2 className="text-[length:var(--fs-500)] mb-2">{zone.title}</h2>
            <p className="text-[color:var(--color-text-muted)]">{zone.description}</p>
        </article>
    );
}

import type { Scene } from '@/domain/game/types';

export default function SceneText({ scene }: { scene: Scene }) {
    return (
        <div className="max-w-xl">
            <h1 className="text-[length:var(--fs-700)] mb-4">{scene.title}</h1>
            {scene.body.map((paragraph, index) => (
                <p key={index} className="text-[color:var(--color-text-muted)] mt-3">
                    {paragraph}
                </p>
            ))}
        </div>
    );
}

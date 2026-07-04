'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Choice } from '@/domain/game/types';
import ChoiceButton from './ChoiceButton';

export default function ChoiceList({ choices }: { choices: Choice[] }) {
    const prefersReducedMotion = useReducedMotion();

    if (!choices.length) return null;

    return (
        <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {choices.map((choice, index) => (
                <motion.li
                    key={choice.id}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: prefersReducedMotion ? 0 : 0.35,
                        delay: prefersReducedMotion ? 0 : 0.25 + index * 0.1,
                        ease: 'easeOut',
                    }}
                >
                    <ChoiceButton choice={choice} />
                </motion.li>
            ))}
        </ul>
    );
}

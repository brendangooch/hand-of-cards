/**
 * package barrel file
 */

import type { PlayingCard } from "@brendangooch/playing-card";

export interface iHand {
    get name(): string;
    get description(): string;
    get score(): number;
    get unordered(): PlayingCard[];
    get ordered(): PlayingCard[];
}

export { HandOfCards } from "./hand-of-cards.js";
export { ConcreteHandOfCards } from "./concrete-hand-of-cards.js";
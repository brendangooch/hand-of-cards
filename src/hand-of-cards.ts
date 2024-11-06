/**
 * a hand of playing cards
 * uses strategy pattern
 * 
 */

import { type iHand } from "./index.js";
import { HandAnalysis } from "@brendangooch/hand-analysis";
import { ConcreteHandOfCards } from "./concrete-hand-of-cards.js";
import { PlayingCard, type tPlayingCardType } from "@brendangooch/playing-card";

export class HandOfCards implements iHand {

    private analysis: HandAnalysis;
    private strategy: ConcreteHandOfCards | null = null;

    public constructor(analysis: HandAnalysis) {
        this.analysis = analysis;
    }

    public get name(): string { return ''; }
    public get description(): string { return ''; }
    public get score(): number { return 0; }
    public get unordered(): PlayingCard[] { return []; }
    public get ordered(): PlayingCard[] { return []; }

    public addStrategy(hand: ConcreteHandOfCards): void { }
    public update(cards: PlayingCard[]): void { }
    public updateTypes(types: tPlayingCardType): void { }

}
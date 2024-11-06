/**
 * 
 */

import { type iHand } from "./index.js";
import { PlayingCard } from "@brendangooch/playing-card";
import { HandAnalysis } from "@brendangooch/hand-analysis";

export abstract class ConcreteHandOfCards implements iHand {

    protected hand: HandAnalysis;
    protected baseScore: number;
    private _name: string;
    private _rank: number;

    public constructor(hand: HandAnalysis, name: string, rank: number, baseScore: number) {
        this.hand = hand;
        this._name = name;
        this._rank = rank;
        this.baseScore = baseScore;
    }

    public get rank(): number {
        return this._rank;
    }

    public get name(): string {
        return this._name;
    }

    public get unordered(): PlayingCard[] {
        return this.hand.unordered;
    }

    public abstract get isValid(): boolean;
    public abstract get description(): string;
    public abstract get score(): number;
    public abstract get ordered(): PlayingCard[];

}
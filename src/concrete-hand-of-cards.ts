/**
 * base concrete hand that all hands in each game extend
 * RANK is ordered in reverse - that is - rank 1 is the highest ranked hand
 */

import { type iHand } from "./index.js";
import { PlayingCard } from "@brendangooch/playing-card";
import { HandAnalysis } from "@brendangooch/hand-analysis";

export abstract class ConcreteHandOfCards implements iHand {

    protected hand: HandAnalysis;
    protected baseScore: number;
    private _name: string;
    private _rank: number;

    public constructor(analysis: HandAnalysis, name: string, rank: number, baseScore: number) {
        this.hand = analysis;
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

    public abstract get isValid(): boolean;
    public abstract get description(): string;
    public abstract get score(): number;
    public abstract get ordered(): PlayingCard[];

}
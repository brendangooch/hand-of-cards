/**
 * a hand of playing cards
 * uses strategy pattern
 * analysis param needs to be the SAME HandAnalysis object passed to ALL concrete classes
 */

import { type iHand } from "./index.js";
import { HandAnalysis } from "@brendangooch/hand-analysis";
import { ConcreteHandOfCards } from "./concrete-hand-of-cards.js";
import { PlayingCard, type tPlayingCardType } from "@brendangooch/playing-card";

export abstract class HandOfCards implements iHand {

    private analysis: HandAnalysis;
    private currentStrategy: ConcreteHandOfCards | null = null;
    private allStrategies: ConcreteHandOfCards[] = [];

    public constructor(analysis: HandAnalysis) {
        this.analysis = analysis;
    }

    public get name(): string {
        return (!this.currentStrategy) ? 'no hand' : this.currentStrategy.name;
    }

    public get description(): string {
        return (!this.currentStrategy) ? 'no hand' : this.currentStrategy.description;
    }

    public get score(): number {
        return (!this.currentStrategy) ? 0 : this.currentStrategy.score;
    }

    public get unordered(): PlayingCard[] {
        return this.analysis.unordered;
    }

    public get ordered(): PlayingCard[] {
        return (!this.currentStrategy) ? this.analysis.unordered : this.currentStrategy.ordered;
    }

    public addStrategy(hand: ConcreteHandOfCards): void {
        this.allStrategies.push(hand);
        this.reOrderStrategies();
    }

    public update(cards: PlayingCard[]): void {
        this.analysis.update(cards);
        this.refreshStrategy();
    }

    public updateTypes(types: tPlayingCardType[]): void {
        this.analysis.updateTypes(types);
        this.refreshStrategy();
    }

    // re-order strategies by rank
    private reOrderStrategies(): void {
        this.allStrategies.sort((a, b) => (a.rank > b.rank) ? 1 : -1);
    }

    // update current strategy
    private refreshStrategy(): void {
        this.currentStrategy = null;
        this.allStrategies.forEach((strategy, index) => (this.currentStrategy === null && strategy.isValid) ? this.currentStrategy = this.allStrategies[index] : false);
    }

}
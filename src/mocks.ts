/**
 * collection of mock classes to test package
 * do NOT include in output
 */

import { PlayingCard } from "@brendangooch/playing-card";
import { ConcreteHandOfCards } from "./concrete-hand-of-cards.js";
import { HandOfCards } from "./hand-of-cards.js";
import { HandAnalysis } from "@brendangooch/hand-analysis";

export class MockHandOfCards extends HandOfCards {
    public constructor() {
        const analysis = new HandAnalysis();
        super(analysis);
        this.addStrategy(new MockThreeOfAKind(analysis));
        this.addStrategy(new MockStraight(analysis));
        this.addStrategy(new MockFlush(analysis));
    }
}

class MockThreeOfAKind extends ConcreteHandOfCards {

    public constructor(analysis: HandAnalysis) {
        super(analysis, 'three of a kind', 1, 300);
    }

    public get isValid(): boolean {

        // 3 jokers
        if (this.hand.numJokers === 3) return true;

        // 2 jokers
        if (this.hand.numJokers === 2) return true;

        // 1 joker
        if (this.hand.numJokers === 1 && this.hand.sameRank(this.hand.nonJokers)) return true;

        // no jokers
        if (this.hand.sameRank([0, 1, 2])) return true;

        return false;

    }

    // not required in tests
    public get score(): number { return 0; }
    public get description(): string { return ''; }
    public get ordered(): PlayingCard[] { return []; }

}

// (straight beats flush in BastardBrag)
class MockStraight extends ConcreteHandOfCards {

    public constructor(analysis: HandAnalysis) {
        super(analysis, 'straight', 2, 200);
    }

    public get isValid(): boolean {

        if (this.isStraightWithJoker()) return true;

        // no jokers
        if (this.hand.noSameRanks() && this.valueBetweenOf2()) return true;

        return false;

    }

    private isStraightWithJoker(): boolean {
        return this.hand.numJokers === 1 && (this.valueBetweenOf1() || this.valueBetweenOf2());
    }

    private valueBetweenOf1(): boolean {
        return this.hand.valueBetween(this.hand.highCard.index, this.hand.lowCard.index) === 1
    }

    private valueBetweenOf2(): boolean {
        return this.hand.valueBetween(this.hand.highCard.index, this.hand.lowCard.index) === 2
    }

    // not required in tests
    public get score(): number { return 0; }
    public get description(): string { return ''; }
    public get ordered(): PlayingCard[] { return []; }

}

class MockFlush extends ConcreteHandOfCards {

    public constructor(analysis: HandAnalysis) {
        super(analysis, 'flush', 3, 100);
    }

    public get isValid(): boolean {

        // 1 joker
        if (this.hand.numJokers === 1 && this.hand.sameSuit(this.hand.nonJokers)) return true;

        // no jokers
        if (this.hand.allSameSuit()) return true;

        return false;

    }

    // not required in tests
    public get score(): number { return 0; }
    public get description(): string { return ''; }
    public get ordered(): PlayingCard[] { return []; }

}
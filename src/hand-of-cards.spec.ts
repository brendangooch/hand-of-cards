/**
 * 
 */

import * as EXPECT from '@brendangooch/jest-expect';
import { MockHandOfCards } from './mocks.js';

let hand: MockHandOfCards;
beforeEach(() => {
    hand = new MockHandOfCards();
});

testAll();
function testAll(): void {

    describe('HandOfCards', () => {
        testIdentifiesMockThreeOfAKind();
        testIdentifiesMockStraight();
        testMatchesStraightAheadOfFlush();
        testIdentifiesMockFlush();
        testIdentifiesNoHand();

    });

}

function testIdentifiesMockThreeOfAKind(): void {
    test('identifies three of a kind (mock)', () => {
        hand.updateTypes([0, 0, 0]);
        EXPECT.toBe(hand.name, 'three of a kind');
        hand.updateTypes([0, 0, 10]);
        EXPECT.toBe(hand.name, 'three of a kind');
        hand.updateTypes([0, 1, 14]);
        EXPECT.toBe(hand.name, 'three of a kind');
        hand.updateTypes([1, 14, 27]);
        EXPECT.toBe(hand.name, 'three of a kind');
    });
}

// no ace high check in mock
function testIdentifiesMockStraight(): void {
    test('identifies straight (mock)', () => {
        hand.updateTypes([14, 2, 0]);
        EXPECT.toBe(hand.name, 'straight');
        hand.updateTypes([14, 0, 29]);
        EXPECT.toBe(hand.name, 'straight');
        hand.updateTypes([0, 2, 29]);
        EXPECT.toBe(hand.name, 'straight');
        hand.updateTypes([14, 2, 3]);
        EXPECT.toBe(hand.name, 'straight');
    });
}

function testMatchesStraightAheadOfFlush(): void {
    test('matches (higher ranked) straight ahead of flush when hand is both a straight AND a flush', () => {
        hand.updateTypes([4, 5, 6]);
        EXPECT.toBe(hand.name, 'straight');
    });
}

function testIdentifiesMockFlush(): void {
    test('identifies flush (mock)', () => {
        hand.updateTypes([1, 0, 5]);
        EXPECT.toBe(hand.name, 'flush');
        hand.updateTypes([1, 3, 5]);
        EXPECT.toBe(hand.name, 'flush');
    });
}

function testIdentifiesNoHand(): void {
    test('identifies no hand', () => {
        hand.updateTypes([1, 2, 50]);
        EXPECT.toBe(hand.name, 'no hand');
        hand.updateTypes([14, 7, 50]);
        EXPECT.toBe(hand.name, 'no hand');
    });
}
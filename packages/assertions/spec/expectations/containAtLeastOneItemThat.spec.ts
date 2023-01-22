import { expect } from '@integration/testing-tools';
import { actorCalled, AssertionError, Question } from '@serenity-js/core';
import { trimmed } from '@serenity-js/core/lib/io';
import { describe, it } from 'mocha';

import { containAtLeastOneItemThat, Ensure, equals, isGreaterThan } from '../../src';

describe('containAtLeastOneItemThat', () => {

    it('allows for the actor flow to continue when the "actual" includes at least one item that meets the expectation', () => {
        return actorCalled('Astrid').attemptsTo(
            Ensure.that([ 0, 1, 2 ], containAtLeastOneItemThat(isGreaterThan(1))),
        );
    });

    it('breaks the actor flow when "actual" does not include at least one item that meets the expectation', () => {
        return expect(actorCalled('Astrid').attemptsTo(
            Ensure.that([ 0, 1, 2 ], containAtLeastOneItemThat(equals(7))),
        )).to.be.rejectedWith(AssertionError, trimmed`
            | Expected [ 0, 1, 2 ] to contain at least one item that does equal 7
            |
            | Expected number: 7
            | Received Array
            |
            | [
            |   0,
            |   1,
            |   2
            | ]`);
    });

    it('breaks the actor flow when "actual" is an empty list', () => {
        return expect(actorCalled('Astrid').attemptsTo(
            Ensure.that([], containAtLeastOneItemThat(equals(42))),
        )).to.be.rejectedWith(AssertionError, trimmed`
            | Expected [ ] to contain at least one item that does equal 42
            |
            | Expected Unanswered
            | Received Array
            |
            | [
            | ]`);
    });

    it('contributes to a human-readable description', () => {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        const numbers = () =>
            Question.about('list of numbers', actor => [ 0, 1, 2 ]);

        expect(Ensure.that(numbers(), containAtLeastOneItemThat(isGreaterThan(1))).toString())
            .to.equal(`#actor ensures that list of numbers does contain at least one item that does have value greater than 1`);
    });
});

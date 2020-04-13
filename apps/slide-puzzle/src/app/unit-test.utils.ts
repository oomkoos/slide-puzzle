/**
 * A query helper function, similar to those provided by Spectator (eg. 'byTestId()')
 *
 * I have a dream that one day we will just use testId, but for now this is the standard
 *
 * @param {string} id - The automation ID of the element you're looking for
 */
export function byAutomationId(id: string): string {
    return `[data-ts-automation="${id}"]`;
}

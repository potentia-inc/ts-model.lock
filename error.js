export * from '@potentia/model/error';
export class LockingError extends Error {
    constructor(message) {
        super(message ?? 'Unknown Lock Error');
    }
}
export class LockError extends LockingError {
    constructor(message) {
        super(message ?? 'Lock Error');
    }
}
export class RelockError extends LockingError {
    constructor(message) {
        super(message ?? 'Relock Error');
    }
}
export class UnlockError extends LockingError {
    constructor(message) {
        super(message ?? 'Unlock Error');
    }
}
//# sourceMappingURL=error.js.map
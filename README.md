# @potentia/model.lock

`Model.lock` is a locking mechanism built on top of
[@potentia/model](https://github.com/potentia-inc/ts-model).

## Usage

```typescript
import { Locks } from '@potentia/model.lock'

const locks = new Locks({ connection: ... })

await locks.lock(
  'foobar', // A unique key to acquire the lock
  async (signal: AbortSignal) => {
    // You can abort if the lock extension fails,
    // or choose to ignore it and continue processing the tasks
    // (at your own risk, as the process may proceed without the lock).
    while (!signal.aborted) {
      await ... // Some sub-tasks within a long-running process
    }
  },
  {
    // All the following options are optional

    // The lock will be active for `ttl` seconds and will automatically extend
    // approximately every `ttl / 2` seconds. The default is `3` seconds.
    ttl: 3,

    // Retry up to `retries` times if the lock extension fails.
    // The default is `0` (no retry).
    retries: 2,

    // Callback for handling errors when failing to extend or release the lock.
    // The default is `undefined` (no error handling).
    onError: (err) => console.error(err)
  },
)

// You can also use the low-level methods to handle the locking manually.
// Refer to the `Locks.lock<T>()` implementation for examples and additional
// details.

// aquire the lock
const lock = await Locks.trylock({ id: 'foobar', expiresAt: ... })
if (lock !== undefined) {
  await locks.relock(lock, { expiresAt: ... }) // extend the lock
  await locks.deleteOne(lock) // release the lock
}
```

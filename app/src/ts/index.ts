/**
 * Wait for the DOM to become ready.
 *
 * @param timeout - The maximum time to wait for the DOM to become ready, in
 * milliseconds. If this is not a finite number, the function will wait
 * indefinitely.
 *
 * @returns A promise that resolves when the DOM is ready or rejects if the
 * timeout is reached.
 */
async function domReady(timeout = Infinity): Promise<void> {
    if (document.readyState === 'complete') {
        return;
    }
    await new Promise<void>((resolve, reject) => {
        if (document.readyState === 'complete') {
            resolve();
            return;
        }
        let timer: number | null = null;
        const listener = () => {
            if (document.readyState === 'complete') {
                if (timer !== null) {
                    clearTimeout(timer);
                    timer = null;
                }
                document.removeEventListener('readystatechange', listener);
                resolve();
            }
        };
        if (isFinite(timeout) && timeout >= 0) {
            timer = setTimeout(() => {
                timer = null;
                document.removeEventListener('readystatechange', listener);
                reject(
                    new Error(`DOM did not become ready within ${timeout} ms`)
                );
            }, timeout);
        }
        document.addEventListener('readystatechange', listener);
    });
}

/**
 * The main entry point of the game.
 *
 * @returns A promise that resolves when the game has started.
 */
async function main(): Promise<void> {
    await domReady();
    // TODO
}

main()
    .then(() => console.log('Game started normally'))
    .catch((err: Error) => {
        console.error('Fatal error during startup:');
        console.error(err);
    });

interface RetryParams { attempt: number; delay: number; error: any; };

export async function retry(fn: any, {
        attempts = 3,
        baseDelay = 1000,
        maxDelay = 10000,
        retryOn = [429, 500, 502, 503, 504],
        onRetry = ({}: RetryParams) => {}
    } = {}) {
    let lastError;

    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            return await fn();
        } catch (err: any) {
            lastError = err;

            const status = err.status ?? err.response?.status;
            const isRetryable = !status || retryOn.includes(status);

            if (!isRetryable || attempt === attempts) {
                throw err;
            }

            // Exponential delay with random jitter
            const delay = Math.min(
                (baseDelay * Math.pow(2, attempt - 1)) + (Math.random() * 1000),
                maxDelay
            );

            onRetry?.({ attempt, delay, error: err });
            await sleep(delay);
        }
    }

    throw lastError;
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
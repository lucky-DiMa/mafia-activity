import {useState} from "react";

export default function useFetch(callback: (controller: AbortController) => Promise<void>): [(controller: AbortController) => Promise<void>, boolean, Error | null] {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    async function sth(controller: AbortController): Promise<void> {
        setIsLoading(true);
        try {
            await callback(controller);
        }
        catch (e: unknown) {
            if (!controller.signal.aborted) setError(e as Error);
        }
        finally {
            setIsLoading(false);
        }
    }
    return [sth, isLoading, error];
}
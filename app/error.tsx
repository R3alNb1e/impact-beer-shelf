"use client";

import Button from '@/components/ui/Button';
import { useEffect } from 'react';

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-center p-4">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Something went wrong!</h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">{error.message || "An unexpected error occurred."}</p>
            <Button
                onClick={
                    () => reset()
                }
                variant="primary"
            >
                Try again
            </Button>
        </div>
    );
}
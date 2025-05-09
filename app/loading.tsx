import Spinner from '@/components/ui/Spinner';

export default function Loading() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size="lg" />
            <p className="ml-4 text-xl">Loading beers...</p>
        </div>
    );
}
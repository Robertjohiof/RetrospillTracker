import Heading from "@/app/shared/components/Heading";

function GameLoadingCard(){
    return (
        <div className="max-w-52 min-w-24 animate-pulse">
            <div className="group border border-white/10 flex flex-col items-center rounded-lg w-full bg-white/5 shadow-md h-82">
                <div className="bg-white/10 aspect-3/4 w-full rounded-t-lg"></div>
                <Heading level={3} styling={"mt-4 mb-4 text-center w-52"}>Loading game...</Heading>
            </div>
        </div>
    )
}

export default function LoadingGame() {
    return (
        <>
            <GameLoadingCard/>
            <GameLoadingCard/>
            <GameLoadingCard/>
            <GameLoadingCard/>
            <GameLoadingCard/>
        </>
    )
}
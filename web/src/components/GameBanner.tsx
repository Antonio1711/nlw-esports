import * as Dialog from '@radix-ui/react-dialog';

interface GameBannerProps {
    bannerUrl: string;
    title: string;
    adsCount: number;
    handleClick: () => void;
}

export function GameBanner(props: GameBannerProps) {
    return (
        <Dialog.Trigger className="relative rounded-lg mb-4 overflow-hidden" onClick={props.handleClick}>
            <img src={props.bannerUrl} alt="" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong className="font-bold text-white block">{props.title}</strong>
                <span className="text-zinc-300 text-sm block">{props.adsCount} anúncio(s)</span>
            </div>
        </Dialog.Trigger>
    )
}
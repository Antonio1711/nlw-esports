import { useEffect, useState } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { useKeenSlider } from "keen-slider/react";

import DuoCard, { DuoCardProps } from "./DuoCard";

export interface AdsProps {
    id: string | undefined;
    title: string | undefined;
    bannerUrl: string | undefined;
}

export default function ListAdsModal(props: AdsProps) {
    const [duos, setDuos] = useState<DuoCardProps[]>([]);

    const [ref] = useKeenSlider<HTMLDivElement>({
        mode: "free",
        slides: {
            perView: 2,
            spacing: 40,
        },
    })

    useEffect(() => {
        axios(`http://192.168.1.6:3333/games/${props.id}/ads`).then(response => {
            setDuos(response.data);
        })
    }, [props])

    return (
        <Dialog.Portal>
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                <Dialog.Title className="text-3xl font-black block">{props.title}</Dialog.Title>
                <span className="text-zinc-400 block">Conecte-se e comece a jogar!</span>

                {
                    duos.length === 0 ?
                        <strong className="font-black block mt-4">Não há anúncios no momento!</strong>
                        :
                        <div ref={ref} className="overflow-x-scroll keen-slider">
                            {duos.map(duo => {
                                return (
                                    <DuoCard
                                        key={duo.id}
                                        data={duo}
                                    />
                                )
                            })}
                        </div>

                }
            </Dialog.Content>
        </Dialog.Portal>
    )
}

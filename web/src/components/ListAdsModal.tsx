import React, { useEffect, useState } from "react";
import { api } from "../lib/api";

import * as Dialog from "@radix-ui/react-dialog";
import * as ToastPrimitive from '@radix-ui/react-toast';
import { useKeenSlider } from "keen-slider/react";
import { GameController, X } from "phosphor-react";

import DuoCard, { DuoCardProps } from "./DuoCard";

export interface AdsProps {
    id: string | undefined;
    title: string | undefined;
    bannerUrl: string | undefined;
}

export default function ListAdsModal(props: AdsProps) {
    const [duos, setDuos] = useState<DuoCardProps[]>([]);
    const ToastProvider = ToastPrimitive.Provider;
    const [open, setOpen] = useState(false);

    const [ref] = useKeenSlider<HTMLDivElement>({
        mode: "free",
        slides: {
            perView: 2,
            spacing: 40,
        },
    })

    useEffect(() => {
        api.get(`/games/${props.id}/ads`).then(response => {
            setDuos(response.data);
        })
    }, [props])

    return (
        <Dialog.Portal>
            <ToastProvider swipeDirection="right" duration={5000}>
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
                                        <React.Fragment key={duo.id}>
                                            <DuoCard data={duo}>
                                                <button
                                                    className="bg-violet-500 px-5 h-10 mt-4 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                                                    onClick={() => {
                                                        setOpen(true);
                                                    }}
                                                >
                                                    <GameController />
                                                    Conectar
                                                </button>
                                            </DuoCard>
                                        </React.Fragment>
                                    )
                                })}
                            </div>

                    }

                </Dialog.Content>

                <ToastPrimitive.Root open={open} onOpenChange={setOpen} className="bg-[#2A2634] rounded-md shadow-lg shadow-black/25 p-3 grid grid-cols-[max-content] gap-3 items-center animate-fade">
                    <ToastPrimitive.Action asChild altText="Fechar toast">
                        <button className="w-[1.5rem] justify-self-end">
                            <X size={25} className="text-white" />
                        </button>
                    </ToastPrimitive.Action>
                    <ToastPrimitive.Title className="text-2xl font-black text-white">Convite enviado!</ToastPrimitive.Title>
                </ToastPrimitive.Root>
                <ToastPrimitive.Viewport className="fixed bottom-0 right-0 flex justify-end text-end flex-col p-4 gap-10 w-64 max-w-[100vw] z-[2147483647] outline-0" />
            </ToastProvider>
        </Dialog.Portal>
    )
}

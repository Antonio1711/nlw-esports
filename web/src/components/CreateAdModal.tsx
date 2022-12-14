import React, { useEffect, useState, FormEvent } from 'react';
import { api } from "../lib/api";

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { useKeenSlider } from "keen-slider/react";
import { X, GameController, Check } from 'phosphor-react';

import { Input } from './Form/input';

interface Game {
    id: string;
    title: string;
}

export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);
    const ToastProvider = ToastPrimitive.Provider;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        api.get('/games').then(response => {
            setGames(response.data);
        })
    }, [])

    async function handleCreatAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if (!data.name) {
            return;
        }

        try {
            await api.post(`/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })

            setOpen(true);


            setTimeout(() => {
                window.location.reload();
            }, 5000)

        } catch (err) {
            console.log(err)
            alert('Erro ao criar o anúncio!')
        }
    }

    return (
        <Dialog.Portal>
            <ToastProvider swipeDirection="right" duration={5000}>
                <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
                <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                    <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

                    <form onSubmit={handleCreatAd} className="mt-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="game" className="font-semibold">Qual o game?</label>
                            <select
                                name="game"
                                id="game"
                                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                                defaultValue=""
                            >
                                <option disabled value="">Selecione o game que deseja jogar</option>
                                {games.map(game => {
                                    return <option key={game.id} value={game.id}>{game.title}</option>
                                })}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Seu nome (ou nickname)</label>
                            <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                                <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="discord">Qual seu Discord?</label>
                                <Input name="discord" id="discord" type="text" placeholder="Usuario#0000" />
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="weekDays">Quando costuma jogar?</label>

                                <ToggleGroup.Root
                                    type="multiple"
                                    className="grid grid-cols-4 gap-2"
                                    value={weekDays}
                                    onValueChange={setWeekDays}
                                >
                                    <ToggleGroup.Item
                                        value="0"
                                        title="Domingo"
                                        className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        D
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="1"
                                        title="Segunda"
                                        className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="2"
                                        title="Terça"
                                        className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        T
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="3"
                                        title="Quarta"
                                        className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Q
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="4"
                                        title="Quinta"
                                        className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Q
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="5"
                                        title="Sexta"
                                        className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="6"
                                        title="Sábado"
                                        className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </ToggleGroup.Item>
                                </ToggleGroup.Root>
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="hourStart">Qual horário do dia?</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                                    <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                                </div>
                            </div>
                        </div>

                        <label className="mt-2 flex items-center gap-2 text-sm">
                            <Checkbox.Root
                                checked={useVoiceChannel}
                                onCheckedChange={(checked) => {
                                    if (checked === true) {
                                        setUseVoiceChannel(true);
                                    } else {
                                        setUseVoiceChannel(false);
                                    }
                                }}
                                className="w-6 h-6 p-1 rounded bg-zinc-900"
                            >
                                <Checkbox.Indicator>
                                    <Check className="w-4 h-4 text-emerald-400" />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            Costumo me conectar ao chat de voz
                        </label>

                        <footer className="mt-4 flex justify-end gap-4">
                            <Dialog.Close
                                type="button"
                                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                            >
                                Cancelar
                            </Dialog.Close>
                            <button
                                type="submit"
                                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                            >
                                <GameController />
                                Encontrar duo
                            </button>
                        </footer>
                    </form>
                </Dialog.Content>

                <ToastPrimitive.Root open={open} onOpenChange={setOpen} className="bg-[#2A2634] rounded-md shadow-lg shadow-black/25 p-3 grid grid-cols-[max-content] gap-3 items-center animate-fade">
                    <ToastPrimitive.Action asChild altText="Fechar toast">
                        <button className="w-[1.5rem] justify-self-end">
                            <X size={25} className="text-white" />
                        </button>
                    </ToastPrimitive.Action>
                    <ToastPrimitive.Title className="text-2xl font-black text-white">Anúncio criado com sucesso!</ToastPrimitive.Title>
                </ToastPrimitive.Root>
                <ToastPrimitive.Viewport className="fixed bottom-0 right-0 flex justify-end text-end flex-col p-4 gap-10 w-auto max-w-[100vw] z-[2147483647] outline-0" />
            </ToastProvider>
        </Dialog.Portal>
    );
}
import * as ToastPrimitive from '@radix-ui/react-toast';

import DuoInfo from './DuoInfo'

export interface DuoCardProps {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  children: JSX.Element;
}

export default function DuoCard({ data, children }: Props) {
  const ToastProvider = ToastPrimitive.Provider;
  const ToastClose = ToastPrimitive.Close;

  return (
    
      <div className="mb-4 overflow-initial keen-slider__slide">
        <DuoInfo
          label="Nome"
          value={data.name}
        />

        <DuoInfo
          label="Tempo de jogo"
          value={`${data.yearsPlaying} anos`}
        />

        <DuoInfo
          label="Disponibilidade"
          value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
        />

        <DuoInfo
          label="Chamade de áudio"
          value={data.useVoiceChannel ? "Sim" : "Não"}
          colorValue={data.useVoiceChannel ? '#34D399' : '#F87171'}
        />


        {children}

      </div >
  )
}

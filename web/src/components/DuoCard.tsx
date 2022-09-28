import { GameController } from 'phosphor-react';
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
}

export default function DuoCard({ data }: Props) {
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

      <button
        type="submit"
        className="bg-violet-500 px-5 h-10 mt-4 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
      >
        <GameController />
        Conectar
      </button>
    </div>
  )
}

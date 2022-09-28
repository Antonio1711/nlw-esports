import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { useKeenSlider } from "keen-slider/react"

import logoImg from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import ListAdsModal, { AdsProps } from './components/ListAdsModal';

import './styles/main.css';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [ads, setAds] = useState<AdsProps>();

  const [ref] = useKeenSlider<HTMLDivElement>({
    mode: "free",
    slides: {
        perView: 6,
        spacing: 20
    }, 
})

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data);
    })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div ref={ref} className="mt-16 gap-4 overflow-x-scroll keen-slider">
        <Dialog.Root>
          {games.map(game => {
            return (
              <div key={game.id} className="min-w-[14vw] keen-slider__slide">
                <GameBanner
                  title={game.title}
                  bannerUrl={game.bannerUrl}
                  adsCount={game._count.ads}
                  handleClick={() => {
                    setAds({
                      bannerUrl: game.bannerUrl,
                      id: game.id,
                      title: game.title
                    })
                  }}
                />
              </div>
            )
          })}

          <ListAdsModal
            bannerUrl={ads?.bannerUrl}
            id={ads?.id}
            title={ads?.title}
          />
        </Dialog.Root>
      </div>

     

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App

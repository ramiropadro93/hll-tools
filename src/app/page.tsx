'use client'

import { useState, useEffect } from 'react'
import PlayerSetup from '@/components/PlayerSetup'
import PlayerCards from '@/components/PlayerCards'

interface Player {
  id: number
  name: string
  timeLeft: number
  isRunning: boolean
  isActive: boolean
}

export default function Home() {
  const [step, setStep] = useState<'setup' | 'players' | 'timers'>('setup')
  const [playerCount, setPlayerCount] = useState<number>(0)
  const [players, setPlayers] = useState<Player[]>([])

  const handlePlayerCountSubmit = (data: number | string[]) => {
    if (typeof data === 'number') {
      setPlayerCount(data)
      setStep('players')
    }
  }

  const handlePlayersSubmit = (data: number | string[]) => {
    if (Array.isArray(data)) {
      const newPlayers: Player[] = data.map((name, index) => ({
        id: index + 1,
        name,
        timeLeft: 300, // 5 minutes in seconds
        isRunning: false,
        isActive: false
      }))
      setPlayers(newPlayers)
      setStep('timers')
    }
  }

  const startTimer = (playerId: number) => {
    setPlayers(prev => prev.map(player => 
      player.id === playerId 
        ? { ...player, isRunning: true, isActive: true }
        : player
    ))
  }

  const resetTimer = (playerId: number) => {
    setPlayers(prev => prev.map(player => 
      player.id === playerId 
        ? { ...player, timeLeft: 300, isRunning: false, isActive: false }
        : player
    ))
  }

  useEffect(() => {
    if (step === 'timers') {
      const interval = setInterval(() => {
        setPlayers(prev => prev.map(player => {
          if (player.isRunning && player.timeLeft > 0) {
            return { ...player, timeLeft: player.timeLeft - 1 }
          }
          if (player.timeLeft === 0 && player.isRunning) {
            return { ...player, isRunning: false }
          }
          return player
        }))
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [step])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-hll-red mb-2">
            HLL Supply Timer
          </h1>
          <p className="text-gray-300">
            Control de cajas de suministros - Hell Let Loose
          </p>
        </header>

        {step === 'setup' && (
          <PlayerSetup 
            onSubmit={handlePlayerCountSubmit}
          />
        )}

        {step === 'players' && (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Configurar Jugadores
            </h2>
            <PlayerSetup 
              playerCount={playerCount}
              onSubmit={handlePlayersSubmit}
            />
          </div>
        )}

        {step === 'timers' && (
          <PlayerCards 
            players={players}
            onStartTimer={startTimer}
            onResetTimer={resetTimer}
          />
        )}
      </div>
    </main>
  )
} 
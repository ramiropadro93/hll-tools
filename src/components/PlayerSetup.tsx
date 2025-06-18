'use client'

import { useState } from 'react'

interface PlayerSetupProps {
  playerCount?: number
  onSubmit: (data: number | string[]) => void
}

export default function PlayerSetup({ playerCount, onSubmit }: PlayerSetupProps) {
  const [count, setCount] = useState<number>(0)
  const [playerNames, setPlayerNames] = useState<string[]>([])

  const handleCountSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (count > 0 && count <= 5) {
      onSubmit(count)
    }
  }

  const handleNamesSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (playerCount && playerNames.length === playerCount && playerNames.every((name: string) => name.trim())) {
      onSubmit(playerNames)
    }
  }

  const updatePlayerName = (index: number, name: string) => {
    const newNames = [...playerNames]
    newNames[index] = name
    setPlayerNames(newNames)
  }

  if (playerCount) {
    // Initialize player names array if not already done
    if (playerNames.length === 0) {
      setPlayerNames(new Array(playerCount).fill(''))
    }

    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <form onSubmit={handleNamesSubmit} className="space-y-4">
          <div className="grid gap-4">
            {Array.from({ length: playerCount }, (_, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-sm font-medium text-gray-300 mb-1">
                  Jugador {index + 1}
                </label>
                <input
                  type="text"
                  value={playerNames[index] || ''}
                  onChange={(e) => updatePlayerName(index, e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hll-blue focus:border-transparent"
                  placeholder={`Nombre del jugador ${index + 1}`}
                  required
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-hll-green hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Finalizar Configuración
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Configurar Jugadores
        </h2>
        <form onSubmit={handleCountSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Cantidad de Jugadores (máximo 5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hll-blue focus:border-transparent"
              placeholder="Ingresa el número de jugadores"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-hll-blue hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            OK
          </button>
        </form>
      </div>
    </div>
  )
} 
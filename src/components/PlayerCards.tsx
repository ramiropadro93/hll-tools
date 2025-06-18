'use client'

interface Player {
  id: number
  name: string
  timeLeft: number
  isRunning: boolean
  isActive: boolean
}

interface PlayerCardsProps {
  players: Player[]
  onStartTimer: (playerId: number) => void
  onResetTimer: (playerId: number) => void
}

export default function PlayerCards({ players, onStartTimer, onResetTimer }: PlayerCardsProps) {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getTimeColor = (timeLeft: number, isRunning: boolean): string => {
    if (!isRunning) return 'text-gray-400'
    if (timeLeft <= 30) return 'text-red-500'
    if (timeLeft <= 60) return 'text-yellow-500'
    return 'text-green-500'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {players.map((player) => (
        <div
          key={player.id}
          className={`bg-gray-800 rounded-lg p-6 shadow-lg border-2 transition-all duration-200 ${
            player.isActive ? 'border-hll-green' : 'border-gray-700'
          }`}
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">
              {player.name}
            </h3>
            
            <div className="mb-6">
              <div className={`text-4xl font-mono font-bold ${getTimeColor(player.timeLeft, player.isRunning)}`}>
                {formatTime(player.timeLeft)}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {player.isRunning ? 'Activo' : player.timeLeft === 300 ? 'Listo' : 'Completado'}
              </div>
            </div>

            <div className="space-y-2">
              {!player.isRunning && player.timeLeft > 0 && (
                <button
                  onClick={() => onStartTimer(player.id)}
                  className="w-full bg-hll-green hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Iniciar Timer
                </button>
              )}
              
              {player.timeLeft === 0 && (
                <button
                  onClick={() => onResetTimer(player.id)}
                  className="w-full bg-hll-blue hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Reiniciar
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 
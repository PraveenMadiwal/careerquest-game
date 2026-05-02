export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-black/50 backdrop-blur-lg border-b border-gray-800">

      <h1 className="text-2xl font-bold text-green-400 glow">
        🎮 CareerQuest
      </h1>

      <div className="space-x-6">
        <a href="/" className="hover:text-green-400">Dashboard</a>
        <a href="/missions" className="hover:text-green-400">Missions</a>
        <a href="/battle" className="hover:text-red-400">Battle</a>
        <a href="/leaderboard" className="hover:text-yellow-400">Leaderboard</a>
      </div>
    </div>
  );
}
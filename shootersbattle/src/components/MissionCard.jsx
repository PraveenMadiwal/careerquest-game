export default function MissionCard({ mission, onComplete }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg hover:scale-105 transition-all">
      <h2 className="text-lg font-bold">{mission.title}</h2>
      <p className="text-sm text-gray-400">{mission.desc}</p>

      <button
        onClick={() => onComplete(mission.xp)}
        className="mt-3 bg-green-500 px-3 py-1 rounded"
      >
        Complete (+{mission.xp} XP)
      </button>
    </div>
  );
}
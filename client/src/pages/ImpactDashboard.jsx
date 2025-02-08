import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Meals Saved", value: 5000 },
  { name: "Food Waste Reduced", value: 2000 },
]

const COLORS = ["#0088FE", "#00C49F"]

export function ImpactDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Impact</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <CounterCard title="Meals Saved" value={5000} color="#0088FE" />
        <CounterCard title="Food Waste Reduced (kg)" value={2000} color="#00C49F" />
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-4">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center mx-2">
            <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <span className="text-sm">{entry.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function CounterCard({ title, value, color }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <h3 className="text-lg font-semibold mb-2" style={{ color }}>
        {title}
      </h3>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <span className="text-3xl font-bold" style={{ color }}>
          {value.toLocaleString()}
        </span>
      </motion.div>
    </div>
  )
}


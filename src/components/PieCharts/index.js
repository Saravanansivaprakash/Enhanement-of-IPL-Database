import {PieChart, Pie, Cell, Legend, Tooltip} from 'recharts'
import './index.css'

const COLORS = ['#00C49F', '#FF8042', '#FFBB28']

const PieCharts = props => {
  const {data} = props

  return (
    <div className="piechart-bg-container">
      <PieChart width={290} height={350}>
        <Pie
          data={data}
          innerRadius={0}
          outerRadius={80}
          dataKey="value"
          nameKey="id"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.id}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
  )
}

export default PieCharts

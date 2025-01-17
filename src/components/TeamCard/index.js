import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {dataList} = props
  const {id, teamImageUrl, name} = dataList
  return (
    <Link to={`/team-matches/${id}`} className="link">
      <li className="team-card">
        <img src={teamImageUrl} alt={name} className="team-img" />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard

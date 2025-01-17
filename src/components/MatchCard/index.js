import './index.css'

const MatchCard = props => {
  const {each} = props
  const {competingTeam, result, competingTeamLogo, matchStatus} = each
  const statusSty = matchStatus === 'Won' ? 'won' : 'lost'
  return (
    <li className="card-list-item">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="list-logo"
      />
      <p className="list-name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={`status ${statusSty}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard

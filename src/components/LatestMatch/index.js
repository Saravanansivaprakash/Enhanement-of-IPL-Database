import './index.css'

const LatestMatch = props => {
  const {dataLatest} = props
  const {
    competingTeam,
    date,
    umpires,
    result,
    manOfTheMatch,
    venue,
    competingTeamLogo,
    firstInnings,
    secondInnings,
  } = dataLatest

  return (
    <div>
      <h1 className="latest-match-card">Latest Match</h1>
      <div className="card-backgroud">
        <div className="competing-team-detail">
          <div className="team-detail-card">
            <p className="competingname">{competingTeam}</p>
            <p>{date}</p>
            <p>{venue}</p>
            <p>{result}</p>
          </div>
          <img
            src={competingTeamLogo}
            alt={`latest match ${competingTeam}`}
            className="wiki-logo"
          />
        </div>
        <hr className="separator-line" />
        <div className="match-detail">
          <h1 className="title-tag">First Innings</h1>
          <p>{firstInnings}</p>
          <h1 className="title-tag">Second Innings</h1>
          <p>{secondInnings}</p>
          <h1 className="title-tag">Man Of The Match</h1>
          <p>{manOfTheMatch}</p>
          <h1 className="title-tag">Umpires</h1>
          <p>{umpires}</p>
        </div>
      </div>
    </div>
  )
}

export default LatestMatch

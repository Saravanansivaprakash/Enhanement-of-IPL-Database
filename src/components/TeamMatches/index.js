import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import PieCharts from '../PieCharts'
import './index.css'

const bgColorList = [
  {bg: '#a4261d', id: 'RCB'},
  {bg: '#f7db00', id: 'CSK'},
  {bg: '#4f5db0', id: 'MI'},
  {bg: '#13418b', id: 'DC'},
  {bg: '#f26d22', id: 'SH'},
  {bg: '#da237b', id: 'RR'},
  {bg: '#4f5db0', id: 'KKR'},
  {bg: '#d91c1f', id: 'KXP'},
]

class TeamMatches extends Component {
  state = {isLoading: true, teamMatch: {}}

  componentDidMount() {
    this.fetchTeamMaches()
  }

  fetchTeamMaches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const formatedLatestMatch = {
      competingTeam: data.latest_match_details.competing_team,
      umpires: data.latest_match_details.umpires,
      result: data.latest_match_details.result,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      id: data.latest_match_details.id,
      date: data.latest_match_details.date,
      venue: data.latest_match_details.venue,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      firstInnings: data.latest_match_details.first_innings,
      secondInnings: data.latest_match_details.second_innings,
      matchStatus: data.latest_match_details.match_status,
    }

    const formatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMtchDetails: formatedLatestMatch,
      recentMatches: data.recent_matches.map(each => ({
        competingTeam: each.competing_team,
        umpires: each.umpires,
        result: each.result,
        manOfTheMatch: each.man_of_the_match,
        id: each.id,
        date: each.date,
        venue: each.venue,
        competingTeamLogo: each.competing_team_logo,
        firstInnings: each.first_innings,
        secondInnings: each.second_innings,
        matchStatus: each.match_status,
      })),
    }

    this.setState({isLoading: false, teamMatch: formatedData})
  }

  backgroundColor = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const filteredColor = bgColorList.filter(each => each.id === id)
    return filteredColor[0].bg
  }

  generatePiechartValue = value => {
    const {teamMatch} = this.state
    const {latestMtchDetails, recentMatches} = teamMatch
    const latestMatchCount = latestMtchDetails.matchStatus === value ? 1 : 0
    const result =
      recentMatches.filter(eachMatch => eachMatch.matchStatus === value)
        .length + latestMatchCount
    return result
  }

  generatePiechartData = () => [
    {id: 'Won', value: this.generatePiechartValue('Won')},
    {id: 'Lost', value: this.generatePiechartValue('Lost')},
    {id: 'Drawn', value: this.generatePiechartValue('Drawn')},
  ]

  renderTeamMatch = () => {
    const {teamMatch} = this.state
    const {teamBannerUrl, latestMtchDetails, recentMatches} = teamMatch
    return (
      <>
        <img src={teamBannerUrl} alt="team banner" className="banner-img" />
        <LatestMatch dataLatest={latestMtchDetails} />
        <h1 className="stats">Statistics</h1>
        <PieCharts data={this.generatePiechartData()} />
        <ul className="list-con">
          {recentMatches.map(each => (
            <MatchCard each={each} key={each.id} />
          ))}
        </ul>
        <Link to="/" className="link-sty">
          <button type="button" className="back-btn-style">
            &larr; Back
          </button>
        </Link>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    const bgcolor = this.backgroundColor()
    return (
      <div
        className="team-match-container"
        style={{backgroundColor: `${bgcolor}`}}
      >
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} />
          </div>
        ) : (
          this.renderTeamMatch()
        )}
      </div>
    )
  }
}

export default TeamMatches

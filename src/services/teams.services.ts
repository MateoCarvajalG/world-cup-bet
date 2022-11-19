import axios from "axios";



export class teamsService {
  Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  })
  
  public teams:any = []
  public teamsSelect:any=[]
  public matches:any = []
  constructor() {
  }
  
  async getTeams() {
    const dataTeams = await this.Api.get('/api/v1/teams', {
        headers: {}
      })
      this.teams = dataTeams.data
      dataTeams.data.forEach((team: any) => {
        this.teamsSelect.push({ label: team.name, value: team._id })
      })
      return {teams: this.teams, teamsSelect:this.teamsSelect}
  }
  
  getImageByTeamId(teamId:string){
    return this.teams.filter((team:any) => team._id === teamId)[0]
  }

  async getMatches(){
    const dataMatches = await this.Api.get('/api/v1/matches', {
      headers: {}
    })
    this.matches = dataMatches.data
  }

  getMatchesByGroup(group:string){
    return this.matches.filter((match:any)=>match.group === group)
  }

}
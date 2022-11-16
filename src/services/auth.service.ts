import axios from "axios";



export class authService {
  Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  })

  private isAuthenticated:boolean = false

  constructor() {
  }
  async signIn(credentials:any){
    try {
      const data = await this.Api.post('/api/v1/auth/login',credentials)
      if(data.status === 200){
        return data
      } 
    } catch (error) {
      return null
        
    }
  }

  signOut(){

  }
  
}
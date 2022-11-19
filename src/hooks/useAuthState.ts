import React, { useReducer } from "react";
import { authService } from "../services/auth.service";
interface IPodium{
    champion : string | null,
    runner_up: string | null,
    third_place : string | null
  }
  interface IMatchResult{
    _id : string | null,
    local_score: number | null,
    visitor_score : number | null
  }
  interface IUserInfo{
    token: string | null,
    names: string | null,
    document: string | null,
    score : string | null,
    selectedTeams: IPodium,
    matchesResults: IMatchResult[] | undefined
    uid?: string | null,
    checking: boolean,
    logged: boolean
  }
const initialState:IUserInfo={
    token : null,
    names : null,
    document: null,
    score : null,
    selectedTeams: {
      champion    : null,
      runner_up   : null,
      third_place : null,
    },
    matchesResults:undefined,
    uid: null,
    checking: true,
    logged: false,
}

const stateReducer = (state:IUserInfo, action:any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
      };
    case "UPDATE_MATCH":
      const deleteMatch = state.matchesResults?.filter(match=> match._id !== action.payload._id)
      deleteMatch?.push(action.payload)
      state.matchesResults = deleteMatch
      return {
       ...state
      };
    default:
      return state;
  }
};
const useAuthState = () => {
  //Reducer
  const [auth, authDispatch] = useReducer(stateReducer, initialState);

  const service = new authService()
  
  let signin = async (Credentials: string) => {
    try {
      const resp = await service.signIn(Credentials)
      if(resp!.status === 200) {
        const {token,names,document,score,selected_teams,matches_results,logged} = resp!.data
        localStorage.setItem('token', token);
        authDispatch({
            type:"LOGIN",
            payload: {
              token: token,
              checking: false,
              logged: true,
              names: names,
              document:document,
              score:score,
              selectedTeams:selected_teams,
              matchesResults:matches_results
            }
        })
        return {ok:true}
      }
    } catch (error) {
      return {ok:false}
    }
  };
  
  let signout = () => {
    service.signOut()
  };

  let signUp = async (userData:any)=>{
      const resp = await service.signUp(userData)
      return resp
  }
  return {
    auth,
    authDispatch,
    signin,
    signout,
    signUp
  };
};

export default useAuthState;


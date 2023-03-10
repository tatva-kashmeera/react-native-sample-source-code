import { apiService } from "../../../services/apiService"

export const loginService = (method: string, url: string , loginParams: any) => {
    return apiService(method, url, loginParams)
}
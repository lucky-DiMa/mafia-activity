import axios from "axios";

export default class APIService {
    static prefix: string = '.proxy/api/'

    static fullUrl(url: string) {
        return this.prefix + url;
    }
    static async getRoles(controller?: AbortController): Promise<{ roleName: string, roleDescription: string }[]> {
        return (await axios.get<{ roles: { roleName: string, roleDescription: string }[] }>(this.fullUrl("roles"), {signal: controller?.signal})).data.roles;
    }

    static async getAccessToken(code: string, controller?: AbortController): Promise<string> {
        return (await axios.post<{ accessToken: string }>(this.fullUrl("token"), {code}, {signal: controller?.signal})).data.accessToken
    }
}
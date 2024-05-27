export function HeaderPreset(AuthToken: string){
    return new Headers({
        "Authorization": AuthToken,
        "Accept": "application/json",
        "User-Agent": "Aru Leo Scrapper"
    })
}

export function AuthHeaderPreset(AuthToken: string, UserToken: string){
    return new Headers({
        "Authorization": AuthToken,
        "Accept": "application/json",
        "Authorization-Key": `Bearer ${UserToken}`,
        "User-Agent": "Aru Leo Scrapper",
        "Content-Type": "application/json"
    })
}
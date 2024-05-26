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
        "Authorization-Key": UserToken,
        "User-Agent": "Aru Leo Scrapper"
    })
}
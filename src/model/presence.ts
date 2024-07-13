export interface IPresence {
    xuid: string
    state: string
    devices: IDevice[]
}

export interface IDevice {
    type: string
    titles: ITitle[]
}

export interface ITitle {
    id: string
    name: string
    placement: string
    state: string
    lastModified: string
    activity?: {
        richPresence: string
    }
}
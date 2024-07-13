import { friends, presence } from "../connector";
import { ICODFriend } from "../dto/codfriend";
import { IFriend } from "../model/friend";
import { FriendRepository } from "../repository";

export class FriendService {

    constructor(private repository: FriendRepository) {}

    public async updateFriends(): Promise<IFriend[]> {

        console.log('Getting friends');
        const result = await friends()

        console.log('Updating friends');

        return this.repository.resetFriends(result);
    }

    public async getFriends(): Promise<ICODFriend[]> {
        const result = await presence();

        console.log('Getting friends', result)

        const friends = await this.repository.getAllFriends();

        const online = result.filter((presence) => presence.state === 'Online');

        console.log('Getting friends', JSON.stringify(online, null, 2))

        const array : ICODFriend[] = []

        online.forEach(presence => {
            const fr = friends.find((f) => (presence.xuid === f.xuid));

            const isPlay = presence.devices.find((d) => {

                console.log('Device titles', d.titles)

                if (d.titles.find((t) => t.id === "2001700854")) {
                    return true
                };
            });

            if (fr && isPlay) {
                array.push({
                    user: fr.displayName,
                    state: fr.state,
                    play: 'Playing COD'
                })
            }
        });

        return array
    }
}
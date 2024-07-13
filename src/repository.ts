import Friend, { IFriend } from "./model/friend";

export class FriendRepository {

  async createFriend(friendData: IFriend): Promise<IFriend> {
    const friend = new Friend(friendData);
    return await friend.save();
  }

  async resetFriends(friendsData: IFriend[]): Promise<IFriend[]> {
    console.log('Resetting friends');

    await Friend.deleteMany({});

    console.log('Insert friends');
    return await Friend.insertMany(friendsData);
  }

  async getAllFriends(): Promise<IFriend[]> {
    return await Friend.find();
  }
}
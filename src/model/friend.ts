import mongoose, { Schema } from "mongoose"

export interface IFriend {
    xuid: string
    displayName: string
    profile: string
    state: string
    time: string
}

const FriendSchema = new Schema<IFriend>({
    xuid: { type: String, required: true },
    displayName: { type: String, required: true },
    profile: { type: String, required: true },
    state: { type: String, required: true },
    time: { type: String, required: true }
  });

  export default mongoose.model<IFriend>('Friend', FriendSchema);
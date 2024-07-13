import { IFriend } from "./model/friend";
import { IPresence } from "./model/presence";

const execute = async (url: string, options: RequestInit = {}) => {
  const baseUrl = 'https://xbl.io/api/'; // Reemplaza con tu URL base
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Authorization':  process.env.TOKEN_XBL || '' // Reemplaza con tu token de autenticación
  };

  options.headers = {
    ...defaultHeaders,
    ...options.headers,
  };

  const response = await fetch(`${baseUrl}${url}`, options);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

export const presence = async () : Promise<IPresence[]> => {
    const [response, iam] = await Promise.all([
        await execute(`/v2/presence`),
        await execute('/v2/2533274875398374/presence')
    ]);

    return [...response, iam];
}

export const friends = async () => {
    const response = await execute('/v2/friends');
    const data = response.people

    const favorites = data.map((friend: any) => {
        const simpleFriend : IFriend = {
            xuid: friend.xuid,
            displayName: friend.displayName,
            profile: friend.displayPicRaw,
            state: friend.presenceState,
            time: friend.presenceText
        }
        
        return simpleFriend;
    })

    return favorites;
}
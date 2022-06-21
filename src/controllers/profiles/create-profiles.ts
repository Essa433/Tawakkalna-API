import { profile } from "console";


export function createProfileController(newProfile: any) {
    const profileIndex = profile.findIndex((el: { id: any; }) => el.id === newProfile.id)
    if (profileIndex === -1) {
        profile.push(newProfile)
    } else {
        profile[profileIndex] = {
            ...profile[profileIndex],
            newProfile,
        };
    }
    return profile;
}
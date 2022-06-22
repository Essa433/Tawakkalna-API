export function createProfileController(profiles: any[], newProfile: any) {
	const profileIndex = profiles.findIndex((el: { id: any; }) => el.id === newProfile.id);
	if (profileIndex === -1) {
		profiles.push(newProfile);
	} else {
		profiles[profileIndex] = {
			...profiles[profileIndex],
			...newProfile,
		};
	}
	return profiles;
}
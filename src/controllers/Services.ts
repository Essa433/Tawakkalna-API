
export function createNewServices(services: any[], newService: any) {

    const serviceIndex = services.findIndex((el: { id: any; }) => el.id === newService.id);
    if (serviceIndex === -1) {
        services.push(newService);
    } else {
        services[serviceIndex] = {
            ...services[serviceIndex],
            ...newService,
        };
    }
    return services;
}
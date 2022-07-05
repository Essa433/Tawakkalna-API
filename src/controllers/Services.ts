
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


// export function ShowServicesInHomepage(services: any[], newService: any) {

//     const serviceIndex = services.findIndex((el: { id: any; }) => el.id === newService.id);
//     if (serviceIndex === -1) {
//         services.push(newService);
//     } else {
//         services[serviceIndex] = {
//             ...services[serviceIndex],
//             ...newService,
//         };
//     }
//     return services;
// }



// async (request, reply) => {
//     const query = request.query as GetServicesQuery;

//     if (query.Service_name) {
//         return services.filter((c) => c.Service_name.includes(query.Service_name ?? ''));
//     } else {
//         return services;
//     }
// },

export function createNewDatapanel(datapanels: any[], newDatapanel: any) {

    const datapanelIndex = datapanels.findIndex((el: { id: any; }) => el.id === newDatapanel.id);
    if (datapanelIndex === -1) {
        datapanels.push(newDatapanel);
    } else {
        datapanels[datapanelIndex] = {
            ...datapanels[datapanelIndex],
            ...newDatapanel,
        };
    }
    return datapanels;
}
class ResourceList {
    static PIC = `../assets/planogramma.png`;
    static HIGHLIGHT = `../assets/correct.png`;
    static SOUND_BG = '../assets/bg.mp3';

    static CUSTOM_RESOURCES: string[] = [];

    static LIST: string[] = [
        ResourceList.PIC,
        ResourceList.HIGHLIGHT,
        ResourceList.SOUND_BG,
        ...ResourceList.CUSTOM_RESOURCES,
    ];
}

export default ResourceList;
export function parseJsonStringOptions(optionsJsonString: string): any[] {
    try {
        let optionsJson: any[] = JSON.parse(optionsJsonString);
        return (optionsJson && optionsJson.constructor === [].constructor) ? optionsJson : [];
    } catch (error) {
        console.error(`Error: Parsing JSON failed. ${error}`);
        return [];
    }
}
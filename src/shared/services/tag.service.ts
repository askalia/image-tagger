import { SerializableTagsData } from "../models/serializable-tag-data.model";

const saveToJsonFile = (data: SerializableTagsData, filename: string) => {
    const serializedJson = JSON.stringify(data, null, 4);
    const jsonDataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(serializedJson);    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', jsonDataUri);
    linkElement.setAttribute('download', filename || 'image-tags.json');
    linkElement.click();
}

const loadTagsFromJsonFile = (file: File): Promise<SerializableTagsData> => {
    return new Promise((resolve, reject) => {        
        function onError(error: any) {
            reader?.removeEventListener("onerror", onError);
            reject(error)
        };
        function onLoad() {
            reader?.removeEventListener("onload", onLoad);
            reader?.removeEventListener("onerror", onError);            
            if (typeof reader?.result === "string"){                
                const tagsData = JSON.parse(reader?.result || "{}");
                if (isValidTagsData(tagsData)){
                    resolve(tagsData)
                }
                reject('JSON file has a wrong structured content')                
            }            
        }
        const reader: FileReader = new FileReader();
        reader.onerror = onError;
        reader.onload = onLoad;          
        reader.readAsText(file);
    });
}

const isValidTagsData = (tagsData: SerializableTagsData|any) => {
    return typeof tagsData?.imageUrl === "string" && tagsData?.imageUrl.trim() !== "" && Array.isArray(tagsData?.tags)
} 

export const tagService = {
    saveToJsonFile,
    loadTagsFromJsonFile
} 
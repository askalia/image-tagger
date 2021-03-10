import { Tag } from "../models/tag.model";


const saveToJsonFile = (imageUrl: string, tags: Tag[], filename: string) => {
    const serializedJson = JSON.stringify({
        imageUrl,
        tags
    }, null, 4);
    const jsonDataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(serializedJson);    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', jsonDataUri);
    linkElement.setAttribute('download', filename || 'image-tags.json');
    linkElement.click();
}

export const tagService = {
    saveToJsonFile
} 
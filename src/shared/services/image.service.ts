const IMAGES_SUPPORTED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif'];

const isImageExtensionSupported = (imageUrl: string): boolean => {    
    const fileExtension = imageUrl.substr(imageUrl.lastIndexOf('.')+1);
    if (! fileExtension){
        // since the url has no explicit extension and we can't check the real MIME type
        // let's admit this is a image, unless native image onError raise something
        return true;
    }
    return IMAGES_SUPPORTED_EXTENSIONS.includes(fileExtension?.toLowerCase())
}

const loadImageFromLocalFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {        
        function onError(error: any) {
            reader?.removeEventListener("onerror", onError);
            reject(error)
        };
        function onLoad() {
            reader?.removeEventListener("onload", onLoad);
            reader?.removeEventListener("onerror", onError);            
            if (typeof reader?.result === "string"){                
                const imageDataUrl = reader?.result;
                resolve(imageDataUrl)                
            }            
        }
        const reader: FileReader = new FileReader();
        reader.onerror = onError;
        reader.onload = onLoad;          
        reader.readAsDataURL(file)
    });
}

export const imageService = {
    isImageExtensionSupported,
    loadImageFromLocalFile
}
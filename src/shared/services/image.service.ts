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

export const imageService = {
    isImageExtensionSupported
}
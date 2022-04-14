export function mapImageResources(resources) {
    return resources.map(resource => {
        const { width, height } = resource;
        return {
            id: resource.asset_id,
            title: resource.public_id,
            src: resource.secure_url,
            width,
            height
        }
    })
}


export async function search(options = {}) {
    const params = {
        ...options
    }

    if (options.nextCursor) {
        params.next_cursor = options.nextCursor
        delete params.nextCursor
    }

    const paramString = Object.keys(params).map(key => `${key}=${encodeURI(params[key])}`).join('&')

    return await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search?${paramString}`, {
        headers: {
            Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_SECRET_KEY).toString('base64')}`
        }
    }).then(r => r.json())

}

export async function getFolders() {
    return await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/folders`, {
        headers: {
            Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_SECRET_KEY).toString('base64')}`
        }
    }).then(r => r.json())

}


import { encode } from 'base64-arraybuffer'
import { buildUrl } from 'cloudinary-build-url'

export async function mapImageResources(resources) {

  const public_id = await resources.map(resource => { 
    const id = getThumbnail(resource.public_id);
    return {
      id
    }
  });

  const thumbnail = public_id.map(thumbail => thumbail.id);
  const promises = public_id.map((id) => fetchBase64(id.id));
  const resolvedPromises = await Promise.all(promises);

  const response = resources.map((data, idx) => ({
    src: data.secure_url,
    key: idx,
    width: data.width,
    height: data.height,
    thumbnail: thumbnail[idx],
    blurred: resolvedPromises[idx],
    id: data.asset_id,
    title: data.public_id

  }));

  return response;

}

const fetchBase64 = async (url) => { 
  const buffer = await (await fetch(url)).arrayBuffer();
  const base64 = encode(buffer);
  return base64;
}

const getThumbnail = (publicID) => { 
  const url = buildUrl(publicID, {
    cloud: {
      cloudName: 'dsfepbdqr'
    },
    transformations: {
      quality: 10,
    }
  })

  return url
}

export async function search(options = {}) {
  const params = {
    ...options
  }

  if (options.nextCursor) {
    params.next_cursor = options.nextCursor
    delete params.nextCursor
  }

  const paramString = Object.keys(params)
    .map(key => `${key}=${encodeURI(params[key])}`)
    .join('&')

  return await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search?${paramString}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY +
            ':' +
            process.env.CLOUDINARY_SECRET_KEY
        ).toString('base64')}`
      }
    }
  ).then(r => r.json())
}

export async function getFolders() {
  return await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/folders`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY +
            ':' +
            process.env.CLOUDINARY_SECRET_KEY
        ).toString('base64')}`
      }
    }
  ).then(r => r.json())
}



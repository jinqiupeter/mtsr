import URL from 'url';

import {RES_USER_AVATARS, RES_USER_BACKGROUNDS} from '../../config';
import logger from '../../logger'

export function imageUri(uri, size = 'small') {
    url = URL.parse(uri);
    //return url.hostname ? (uri + '!' + size) : uri;
    return uri;
}

export function imageSource(uri, size = 'small') {
    return {uri: uri};
}

export function accountAvatarSource({profileimageurl, avatarFile},
    size = 'small') {
    logger.debug("getting user avatar: ", profileimageurl, avatarFile);
    if (profileimageurl) {
        return imageSource(profileimageurl, size);
    } else if (avatarFile) {
        return imageSource(avatarFile.url, size);
    } else {
        return null;
    }
}

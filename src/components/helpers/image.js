/**
 * 在球场
 * zaiqiuchang.com
 */

import URL from 'url';

import {RES_USER_AVATARS, RES_USER_BACKGROUNDS} from '../../config';
import logger from '../../logger'

export function imageUri(uri, size = 'small') {
    url = URL.parse(uri);
    //return url.hostname ? (uri + '!' + size) : uri;
    return uri;
}

export function imageSource(uri, size = 'small') {
    return {uri: imageUri(uri, size)};
}

export function userAvatarSource({profileImageUrl, avatarFile},
    size = 'small') {
    logger.debug("userAvatarSource: ", profileImageUrl, avatarFile);
    if (profileImageUrl) {
        let imagesource = imageSource(profileImageUrl, size);
        logger.debug("returninng image source: ", imagesource);
        return imageSource(profileImageUrl, size);
    } else if (avatarFile) {
        return imageSource(avatarFile.url, size);
    } else {
        return null;
    }
}

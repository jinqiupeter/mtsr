/**
 * 在球场
 * zaiqiuchang.com
 */
import logger from '../../logger';

export function userFromCache(object, userId) {
    logger.debug("getting userid from object.user:", userId, object.users);
    let user = object.users[userId];
    if (!user) {
        console.warn(`user ${userId} not in cache`);
        return null;
    }

    // let profileImageUrl = fileFromCache(object, user.profileImageUrl);
    // if (!profileImageUrl) {
    //     return null;
    // }
    // let stat = userStatFromCache(object, user.id);
    // if (!stat) {
    //   return null;
    // }
    //return Object.assign({}, user, {avatarFile, stat});
    return Object.assign({}, user);
}

export function attendClassFromCache(object, classId) {
    let attendedClass = object.attendedClasses[classId];
    if (!attendedClass) {
        console.warn(`attendedClass ${classId} not in cache`);
        return null;
    }
    // let creator = userFromCache(object, classes.creatorId);
    // if (!creator) {
    //     return null;
    // }
    // let court = courtFromCache(object, classes.courtId);
    // if (!court) {
    //     return null;
    // }
    // let imageFiles = classes.imageIds
    //     .map((v) => fileFromCache(object, v))
    //     .filter((v) => v !== null);
    // let stat = postStatFromCache(object, classes.id);
    // if (!stat) {
    //     return null;
    // }
    return Object.assign({}, attendedClass);
}

export function courtFromCache(object, courtId) {
    let court = object.courts[courtId];
    if (!court) {
        console.warn(`court ${courtId} not in cache`);
        return null;
    }
    let stat = courtStatFromCache(object, court.id);
    if (!stat) {
        return null;
    }
    return Object.assign({}, court, {stat});
}

export function fileFromCache(object, fileId) {
    let file = object.files[fileId];
    if (!file) {
        console.warn(`file ${fileId} not in cache`);
        return null;
    }
    return file;
}

export function userStatFromCache(object, userId) {
    let userStat = object.userStats[userId];
    if (!userStat) {
        console.warn(`userStat ${userId} not in cache`);
        return null;
    }
    return userStat;
}

export function postStatFromCache(object, postId) {
    let postStat = object.postStats[postId];
    if (!postStat) {
        console.warn(`postStat ${postId} not in cache`);
        return null;
    }
    return postStat;
}

export function courtStatFromCache(object, courtId) {
    let courtStat = object.courtStats[courtId];
    if (!courtStat) {
        console.warn(`courtStat ${courtId} not in cache`);
        return null;
    }
    return courtStat;
}

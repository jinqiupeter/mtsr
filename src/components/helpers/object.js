/**
 * 在球场
 * zaiqiuchang.com
 */
import logger from '../../logger';
import parse from 'date-fns/parse';

export function userFromCache(object, userId) {
    let user = object.users[userId];
    if (!user) {
        console.warn(`user ${userId} not in cache`);
        return null;
    }

    return Object.assign({}, user);
}

export function attendClassFromCache(object, classId) {
    let attendedClass = object.attendedClasses[classId];
    if (!attendedClass) {
        console.warn(`attendedClass ${classId} not in cache`);
        return null;
    }

    return Object.assign({}, attendedClass);
}

export function unattendClassFromCache(object, classId) {
    let unattendedClass = object.unattendedClasses[classId];
    unattendedClass.date = parse(unattendedClass.date);
    if (!unattendedClass) {
        console.warn(`unattendedClass ${classId} not in cache`);
        return null;
    }

    return Object.assign({}, unattendedClass);
}

export function activitiesFromCache(object, activityId) {
    let activity = object.activities[activityId];
    if (!activity) {
        console.warn(`activity ${activityId} not in cache`);
        return null;
    }

    return Object.assign({}, activity);
}

export function faqFromCache(object, faqId) {
    let faq = object.faqs[faqId];
    if (!faq) {
        console.warn(`faq ${faqId} not in cache`);
        return null;
    }

    return Object.assign({}, faq);
}

export function packedSelectablesFromCache(object) {
    logger.debug("getting packed selectables from: ", object);
    let packed = object.selectableClasses;
    if (!packed) {
        console.warn(`selectableClasses not in cache`);
        return null;
    }

    return Object.assign({}, packed);
}

export function fileFromCache(object, fileId) {
    let file = object.files[fileId];
    if (!file) {
        console.warn(`file ${fileId} not in cache`);
        return null;
    }
    return file;
}

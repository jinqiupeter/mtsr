/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as apis from '../apis';
import * as actions from './';

export const RESET_OBJECT_CACHE = 'reset_object_cache';
export const CACHE_OBJECTS = 'cache_objects';

export function resetObjectCache() {
    return {
        type: RESET_OBJECT_CACHE,
    };
}

function cacheObjects({users, userIds, attendedClasses, attendedClassIds,
    unattendedClasses, unattendedClassIds, activities, activityIds,
    files, fileIds, faqs, faqIds, userStats, selectableClasses, selectableClassIds, feedbacks, feedbackIds}) {
    let aToO = (objects, objectIds) => {
        let o = objects.reduce((o, v) => {
            o[v.id] = v;
            return o;
        }, {});
        if (objectIds !== undefined) {
            objectIds.forEach((v) => {
                if (o[v] === undefined) {
                    o[v] = null;
                }
            });
        }
        return o;
    };

    let action = {
        type: CACHE_OBJECTS,
    };
    if (users !== undefined) {
        action.users = aToO(users, userIds);
    }
    if (attendedClasses !== undefined) {
        action.attendedClasses = aToO(attendedClasses, attendedClassIds);
    }
    if (unattendedClasses !== undefined) {
        action.unattendedClasses = aToO(unattendedClasses, unattendedClassIds);
    }
    if (activities !== undefined) {
        action.activities = aToO(activities, activityIds);
    }
    if (files !== undefined) {
        action.files = aToO(files, fileIds);
    }
    if (userStats !== undefined) {
        action.userStats = userStats;
    }
    if (selectableClasses !== undefined) {
        action.selectableClasses = selectableClasses;
    }
    if (faqs !== undefined) {
        action.faqs = aToO(faqs, faqIds);
    }
    if (feedbacks !== undefined) {
        action.feedbacks = aToO(feedbacks, feedbackIds);
    }

    return action;
}

function mergeCacheObjectsActions(actions) {
    return actions.reduce(
        (result, action) => {
            if (typeof result == 'object' && result.type == CACHE_OBJECTS
                && typeof action == 'object' && action.type == CACHE_OBJECTS) {
                for (let [k, v] of Object.entries(action)) {
                    if (k == 'type') {
                        continue;
                    }
                    if (result[k] === undefined) {
                        result[k] = {};
                    }
                    result[k] = Object.assign(result[k], v);
                }
            } else {
                result = action;
            }

            return result;
        },
        {
            type: CACHE_OBJECTS,
        }
    );
}

export function cacheUsers(object, users, userIds) {
    let ps = [cacheObjects({users, userIds})];

    return Promise.all(ps).then((actions) => mergeCacheObjectsActions(actions));
}

export function cacheActivities(object, activities, activityIds) {
    let ps = [cacheObjects({activities, activityIds})];

    return Promise.all(ps).then((actions) => mergeCacheObjectsActions(actions));
}

export async function cacheUserByIds(object, userIds, update=false) {
    userIds = Array.from(new Set(userIds));
    if (!update) {
        userIds = userIds.filter((v) => object.users[v] === undefined);
    }
    if (userIds.length > 0) {
        let response;
        try {
            response = await apis.userInfos(userIds);
        } catch (error) {
            return actions.handleApiError(error);
        }
        let {data: {users}} = response;
        return cacheUsers(object, users, userIds);
    } else {
        return cacheUsers(object, []);
    }
}

export function cacheAttendedClasses(object, attendedClasses, classIds) {
    let ps = [cacheObjects({attendedClasses, classIds})];

    return Promise.all(ps).then((actions) => mergeCacheObjectsActions(actions));
}

export function cacheUnattendedClasses(object, unattendedClasses, classIds) {
    let ps = [cacheObjects({unattendedClasses, classIds})];

    return Promise.all(ps).then((actions) => mergeCacheObjectsActions(actions));
}

export function cacheSelectableClasses(object, selectableClasses, classIds) {
    let ps = [cacheObjects({selectableClasses, classIds})];

    return Promise.all(ps).then((actions) => mergeCacheObjectsActions(actions));
}

export function cacheFaqs(object, faqs, faqIds) {
    let ps = [cacheObjects({faqs, faqIds})];

    return Promise.all(ps).then((actions) => mergeCacheObjectsActions(actions));
}

export function cacheFeedbacks(object, feedbacks, feedbackIds) {
    let ps = [cacheObjects({feedbacks, feedbackIds})];

    return Promise.all(ps).then((actions) => mergeCacheObjectsActions(actions));
}

export async function cachePostByIds(object, postIds, update=false) {
    postIds = Array.from(new Set(postIds));
    if (!update) {
        postIds = postIds.filter((v) => object.posts[v] === undefined);
    }
    if (postIds.length > 0) {
        let response;
        try {
            response = await apis.postInfos(postIds);
        } catch (error) {
            return actions.handleApiError(error);
        }
        let {data: {posts}} = response;
        return cachePosts(object, posts, postIds);
    } else {
        return cachePosts(object, []);
    }
}

export function cacheCourts(object, courts, courtIds) {
    let ps = [cacheObjects({courts, courtIds})];

    courtIds = [];
    let stats = [];
    courts.filter((v) => v !== null).forEach((court) => {
        courtIds.push(court.id);
        if (court.stat) {
            stats[court.id] = court.stat;
            delete court.stat;
        }
    })
    if (Object.keys(stats).length > 0) {
        ps.push(cacheCourtStats(stats));
    } else {
        ps.push(cacheCourtStatByIds(object, courtIds));
    }

    return Promise.all(ps).then((actions) => mergeCacheObjectsActions(actions));
}

export async function cacheCourtByIds(object, courtIds, update=false) {
    courtIds = Array.from(new Set(courtIds));
    if (!update) {
        courtIds = courtIds.filter((v) => object.courts[v] === undefined);
    }
    if (courtIds.length > 0) {
        let response;
        try {
            response = await apis.courtInfos(courtIds);
        } catch (error) {
            return actions.handleApiError(error);
        }
        let {data: {courts}} = response;
        return cacheCourts(object, courts, courtIds);
    } else {
        return cacheCourts(object, []);
    }
}

export function cacheFiles(files, fileIds) {
    return cacheObjects({files, fileIds});
}

export async function cacheFileByIds(object, fileIds, update=false) {
    fileIds = Array.from(new Set(fileIds));
    if (!update) {
        fileIds = fileIds.filter((v) => object.files[v] === undefined);
    }
    if (fileIds.length > 0) {
        let response;
        try {
            response = await apis.fileInfos(fileIds);
        } catch (error) {
            return actions.handleApiError(error);
        }
        let {data: {files}} = response;
        return cacheFiles(files, fileIds);
    } else {
        return cacheFiles([]);
    }
}

export function cacheUserStats(userStats) {
    return cacheObjects({userStats});
}



export function cachePostStats(postStats) {
    return cacheObjects({postStats});
}

export async function cachePostStatByIds(object, postIds, update=false) {
    postIds = Array.from(new Set(postIds));
    if (!update) {
        postIds = postIds.filter((v) => object.postStats[v] === undefined);
    }
    if (postIds.length > 0) {
        let response;
        try {
            response = await apis.postStats(postIds);
        } catch (error) {
            return actions.handleApiError(error);
        }
        let {data: {stats: postStats}} = response;
        return cachePostStats(postStats);
    } else {
        return cachePostStats({});
    }
}

export function cacheCourtStats(courtStats) {
    return cacheObjects({courtStats});
}

export async function cacheCourtStatByIds(object, courtIds, update=false) {
    courtIds = Array.from(new Set(courtIds));
    if (!update) {
        courtIds = courtIds.filter((v) => object.courtStats[v] === undefined);
    }
    if (courtIds.length > 0) {
        let response;
        try {
            response = await apis.courtStats(courtIds);
        } catch (error) {
            return actions.handleApiError(error);
        }
        let {data: {stats: courtStats}} = response;
        return cacheCourtStats(courtStats);
    } else {
        return cacheCourtStats({});
    }
}

import * as utils from '../../utils';
import logger from '../../logger';
import diffInWeek from 'date-fns/difference_in_calendar_weeks';
import parse from 'date-fns/parse';

export const WEEK_DAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export function dateText(date) {
    if (typeof date == 'string') {
        date = parse(date);
    }
    now = new Date();
    interval = (now - date) / 1000 / 60;
    if (interval < 1) {
        return '刚刚';
    } else if (1 <= interval && interval < 60) {
        return Math.floor(interval) + '分钟前';
    } else if (60 <= interval && interval < 1440) {
        return Math.floor(interval / 60) + '小时前';
    } else {
        return date.toISOString().substring(0, 10);
    }
}

export function weekDayText(date) {
    if (typeof date == 'string') {
        date = parse(date);
    }

    let str = WEEK_DAYS[date.getDay()];
    let diff = diffInWeek(date, new Date());
    if (diff == 0) {
        return '本' + str;
    } else if (diff == 1) {
        return '下' + str;
    } else if (diff == -1) {
        return '上' + str;
    } else {
        return str;
    }
}

export function dayTimeText(date) {
    if (typeof date == 'string') {
        date = parse(date);
    }
    let hour = date.getHours();
    let minute = date.getMinutes();
    return utils.lpad((hour), 2, '0') + ':' + utils.lpad(minute, 2, '0');
}

export function yearMonthDayText(date) {
    if (typeof date == 'string') {
        date = parse(date);
    }
    let year = date.getFullYear();
    let month = 1 + date.getMonth();
    let day = date.getDate();
    return `${year}年${month}月${day}日`;
}

export function yearMonthDayWeekText(date) {
    return yearMonthDayText(date) + ' ' + weekDayText(date);
}

export function monthAgeInYears(months) {
    let years = parseInt(months / 12);
    let remainder = months % 12;
    return years + '岁' + remainder + '个月';
}

export function isNeedRefresh({sceneKey, network, minInterval = 600, objectId = ''}) {
    let lastRefreshTime = network.lastRefreshTime[sceneKey] || {};
    return (!lastRefreshTime[objectId] || (new Date() - new Date(lastRefreshTime[objectId]) > minInterval * 1000));
}

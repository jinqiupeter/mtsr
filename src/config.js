import {Platform, Dimensions} from 'react-native';

export const DEBUG = __DEV__;
export const IN_DEBUGGER = DEBUG && !!window.navigator.userAgent;
export const LC_CONFIG = {
    id: 'jbNk2nNnq4bVbcQIgkjuOAOx-gzGzoHsz',
    key: '3JpiddJgElPL28yFHWMQSANL',
};

export const VERSION = '1.0.2';

let {width, height} = Dimensions.get('window');
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const NAV_BAR_HEIGHT = Platform.OS == 'ios' ? 64 : 54;
export const TAB_BAR_HEIGHT = 50;

export let SCHEME = 'http';
export let DOMAIN_API = '139.224.64.6/CRM/app';
export let CRM_API = '139.224.64.6/CRM';
export let CRM_ORIGIN = `${SCHEME}://${CRM_API}`;
export let API_ORIGIN = `${SCHEME}://${DOMAIN_API}`;

export const BUTTON = {
    borderRadius: 10,
    margin: 15,
    padding: 10
};

export const COLOR = {
    theme: '#70BA42',
    textHighlight: '#ECBA3A',
    shadowHighlight: '#EEA434',
    textPrompt: '#929292',
    textNormal: '#5E5E5E',
    textEmpha: '#212121',
    textLightPrompt: '#EBEBEB',
    textLightNormal: '#FFFFFF',
    backgroundDarker: '#D6D6D6',
    backgroundNormal: '#EBEBEB',
    backgroundLighter: '#FFFFFF',
    backgroundDarkLighter: '#212121',
    backgroundDarkNormal: '#000000',
    backgroundNotice: '#E9BB28',
    linePrompt: '#EBEBEB',
    lineNormal: '#A9A9A9',
    lineEmpha: '#929292',
};

export const RES_USER_AVATARS = new Map([
    ['american-football-player-1', require('zaiqiuchang/res/img/avatar/american-football-player-1.png')],
    ['american-football-player', require('zaiqiuchang/res/img/avatar/american-football-player.png')],
    ['baseball-player', require('zaiqiuchang/res/img/avatar/baseball-player.png')],
    ['basketball-player', require('zaiqiuchang/res/img/avatar/basketball-player.png')],
    ['bodybuilder', require('zaiqiuchang/res/img/avatar/bodybuilder.png')],
    ['cricket-player', require('zaiqiuchang/res/img/avatar/cricket-player.png')],
    ['cyclist-1', require('zaiqiuchang/res/img/avatar/cyclist-1.png')],
    ['cyclist', require('zaiqiuchang/res/img/avatar/cyclist.png')],
    ['fencer', require('zaiqiuchang/res/img/avatar/fencer.png')],
    ['football-player', require('zaiqiuchang/res/img/avatar/football-player.png')],
    ['formula-1', require('zaiqiuchang/res/img/avatar/formula-1.png')],
    ['golfer', require('zaiqiuchang/res/img/avatar/golfer.png')],
    ['gymnast', require('zaiqiuchang/res/img/avatar/gymnast.png')],
    ['hockey-player', require('zaiqiuchang/res/img/avatar/hockey-player.png')],
    ['horsewoman', require('zaiqiuchang/res/img/avatar/horsewoman.png')],
    ['karate', require('zaiqiuchang/res/img/avatar/karate.png')],
    ['kickboxer', require('zaiqiuchang/res/img/avatar/kickboxer.png')],
    ['kudo', require('zaiqiuchang/res/img/avatar/kudo.png')],
    ['motorcyclist', require('zaiqiuchang/res/img/avatar/motorcyclist.png')],
    ['pilot', require('zaiqiuchang/res/img/avatar/pilot.png')],
    ['rowing', require('zaiqiuchang/res/img/avatar/rowing.png')],
    ['shooter', require('zaiqiuchang/res/img/avatar/shooter.png')],
    ['skier-1', require('zaiqiuchang/res/img/avatar/skier-1.png')],
    ['skier', require('zaiqiuchang/res/img/avatar/skier.png')],
    ['sumotori', require('zaiqiuchang/res/img/avatar/sumotori.png')],
    ['swimmer', require('zaiqiuchang/res/img/avatar/swimmer.png')],
    ['taekwondo', require('zaiqiuchang/res/img/avatar/taekwondo.png')],
    ['tennis-player', require('zaiqiuchang/res/img/avatar/tennis-player.png')],
    ['volleyball-player', require('zaiqiuchang/res/img/avatar/volleyball-player.png')],
    ['weightlifter', require('zaiqiuchang/res/img/avatar/weightlifter.png')],
]);

export const RES_USER_BACKGROUNDS = new Map([
    ['light-circle', require('zaiqiuchang/res/img/user-background/light-circle.png')],
    ['juhua', require('zaiqiuchang/res/img/user-background/juhua.png')],
    ['pugongying', require('zaiqiuchang/res/img/user-background/pugongying.png')],
]);

export const GENDERS = [
    {label: '男', value: 'm'},
    {label: '女', value: 'f'},
];

export const customDayHeadings = ['日', '一', '二', '三', '四', '五', '六'];
export const customMonthNames = ['一月', '二月', '三月', '四月', '五月',
    '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

export const NOTIFY_TIME = 3;
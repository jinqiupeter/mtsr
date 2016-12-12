import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Router, Scene} from 'react-native-router-flux';
import {ActionConst} from 'react-native-router-flux';

import * as containers from './containers';

const RouterConnected = connect()(Router);

export default class ZQCApp extends Component {
    render() {
        return (
            <RouterConnected>
                <Scene key='root'>
                    <Scene key='Bootstrap' component={containers.Bootstrap} type={ActionConst.RESET} initial={true}/>

                    <Scene key='PreLogin' component={containers.PreLogin} type={ActionConst.RESET}/>
                    <Scene key='Classes' component={containers.Classes} type={ActionConst.RESET}/>
                    <Scene key='Schedule' component={containers.Schedule} type={ActionConst.RESET}/>
                    <Scene key='Activities' component={containers.Activities} type={ActionConst.RESET}/>
                    <Scene key='Me' component={containers.Me} type={ActionConst.RESET}/>

                    <Scene key='Login' component={containers.Login}/>
                    <Scene key='RegisterMobile' component={containers.RegisterMobile}/>
                    <Scene key='RegisterVerify' component={containers.RegisterVerify}/>
                    <Scene key='RegisterProfile' component={containers.RegisterProfile}/>

                    <Scene key='EditProfile' component={containers.EditProfile}/>
                    <Scene key='EditProfileNickname' component={containers.EditProfileNickname}/>
                    <Scene key='EditProfileAvatar' component={containers.EditProfileAvatar}/>

                    <Scene key='About' component={containers.About}/>

                    <Scene key="AfterClassInstruction" component={containers.AfterClassInstruction}/>
                    <Scene key="ActivityPoster" component={containers.ActivityPoster}/>

                </Scene>
            </RouterConnected>
        );
    }
}

const styles = StyleSheet.create({});

import React, {Component} from 'react';
import {PushNotificationIOS} from 'react-native';
import {connect} from 'react-redux';
import {Router, Scene} from 'react-native-router-flux';
import {ActionConst} from 'react-native-router-flux';

import * as containers from './containers';
import * as components from './components';

const RouterConnected = connect()(Router);

export default class ZQCApp extends Component {
    componentDidMount() {
        PushNotificationIOS.setApplicationIconBadgeNumber(0);
    }

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
                    <Scene key='AssociateXpy' component={containers.AssociateXpy}/>

                    <Scene key='EditProfile' component={containers.EditProfile}/>
                    <Scene key='EditProfileNickname' component={containers.EditProfileNickname}/>
                    <Scene key='EditProfileAvatar' component={containers.EditProfileAvatar}/>
                    <Scene key="EditProfilePassword" component={containers.EditProfilePassword}/>

                    <Scene key='About' component={containers.About}/>
                    <Scene key="FAQ" component={containers.FAQ}/>
                    <Scene key="CreateFeedback" component={containers.CreateFeedback}/>
                    <Scene key="Feedback" component={containers.Feedback} />
                    <Scene key="Referral" component={containers.Referral} />
                    <Scene key="CreateReferral" component={containers.CreateReferral} />
                    <Scene key="Sponsor" component={containers.Sponsor} />
                    <Scene key="Appointment" component={containers.Appointment} />
                    <Scene key="CreateAppointment" component={containers.CreateAppointment} />

                    <Scene key="AfterClassInstruction" component={containers.AfterClassInstruction}/>
                    <Scene key="ActivityPoster" component={containers.ActivityPoster}/>
                    <Scene key="SelectClass" component={containers.SelectClass}/>

                    <Scene key="TakeInput" component={components.TakeInput} />
                    <Scene key="DatePick" component={components.DatePick} />
                    <Scene key="Web" component={components.Web} />
                    <Scene key="QRScanner" component={components.QRScanner} />
                </Scene>
            </RouterConnected>
        );
    }
}

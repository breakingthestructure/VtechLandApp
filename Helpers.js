import React from 'react';
import {
    Linking,
    Platform,
    Text,
    View
} from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import styles from './styles';
import { AVAIABLE, DISABLED, HOLDING, INCOMPLETE, SOLD, WAITING } from './constants/app';

export function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
export function formatMoney(n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

export function getDayNextMonth(date, numberMonth = 1) {
    let day = date.getDate();
    let month = date.getMonth() + 1 + numberMonth;
    let year = date.getFullYear();
    let totalDayInMonth = getDaysInMonth(month, year);
    if (day > totalDayInMonth) {
        day = totalDayInMonth;
    }
    if (month > 12) {
        let times = Math.floor(month / 12);
        let few = month % 12;
        if (few > 0) {
            month = few;
            year += times;
        }
        if (times > 0 && few == 0) {
            month = 12;
            year += (times - 1);
        }
    }
    return day + '-' + month + '-' + year;
}

export function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export function getYoutubeId(youtubeStr) {
    let videoId = '';
    if (newval = youtubeStr.match(/(\?|&)v=([^&#]+)/)) {
        videoId = newval.pop();
    } else if (newval = youtubeStr.match(/(\.be\/)+([^\/]+)/)) {
        videoId = newval.pop();
    } else if (newval = youtubeStr.match(/(\embed\/)+([^\/]+)/)) {
        videoId = newval.pop().replace('?rel=0', '');
    }
    return videoId;
}

export function loading() {
    return (
        <Container>
            <Content contentContainerStyle={styles.containerLoading}>
                <Spinner />
            </Content>
        </Container>
    );
}

export function callingPhone(phoneNumber) {
    const url = `tel://+${phoneNumber}`;
    return Linking.openURL(url);
}

export function openSmsUrl(phone: string, body: string): Promise<any> {
    return Linking.openURL(`sms:${phone}${getSMSDivider()}body=${body}`);
}

export function openEmail(email: string, body: string): Promise<any> {
    return Linking.openURL('mailto:email&subject=abcdefg&body=body');
}

function getSMSDivider(): string {
    return Platform.OS === 'ios' ? '&' : '?';
}

export function convertTimestampToDateTime($timestamp) {
    const input = new Date($timestamp.replace(/-/g, '/')).getTime();
    const d = new Date();
    const _now = d.getTime();
    let re = (_now - input) / 1000 / 60 / 60 / 24;
    if (re > 1) {
        //time > 1 day
        const _d = new Date(input);
        return _d.getHours() + ':' + _d.getMinutes() + ' ' + _d.getDate() + '/' + (_d.getMonth() + 1) + '/' + _d.getFullYear().toString().substr(-2);
    } else {
        re = re * 24;
        if (re > 1) {
            return parseInt(re) + ' giờ trước';
        } else {
            re = re * 60;
            if (re > 1) {
                return parseInt(re) + ' phút trước';
            } else {
                return 'vài giây trước';
            }
        }
    }
    // let date = dateObj.getDate();
    // let year = dateObj.getFullYear().toString().substr(-2);
    // let month = dateObj.getMonth();
    // let hours = dateObj.getHours();
    // let minutes = dateObj.getMinutes();
    // let seconds = dateObj.getSeconds();
    // return hours + ':'+ minutes + ' '+ date + '/' + month + '/'+ year;
}

export function convertIntToDateTime(t) {
    const dateObj = new Date(t * 1000);
    return ((dateObj.getMonth() + 1) + '-' +
        (dateObj.getDate()) + '-' +
        dateObj.getFullYear() + ' ' +
        dateObj.getHours() + ':' +
        ((dateObj.getMinutes() < 10)
            ? ('0' + dateObj.getMinutes())
            : (dateObj.getMinutes())) + ':' +
        ((dateObj.getSeconds() < 10)
            ? ('0' + dateObj.getSeconds())
            : (dateObj.getSeconds())));
}


// gets the current screen from navigation state
export function getActiveRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getActiveRouteName(route);
    }
    return route.routeName;
}

export function dataNotFound() {
    return (
        <View>
            <Text>Dữ liệu trống</Text>
        </View>
    );
}

import React from 'react';
import { Linking, Platform } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import styles from './styles';

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
    var day = date.getDate();
    var month = date.getMonth() + 1 + numberMonth;
    var year = date.getFullYear();
    var totalDayInMonth = getDaysInMonth(month, year);
    if (day > totalDayInMonth) {
        day = totalDayInMonth;
    }
    if (month > 12) {
        var times = Math.floor(month / 12);
        var few = month % 12;
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

function getSMSDivider(): string {
    return Platform.OS === 'ios' ? '&' : '?';
}

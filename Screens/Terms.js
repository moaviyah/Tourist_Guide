import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { PRIMARY } from '../colors';

const Terms = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop:20}}>
                <Image source={require('../assets/back_white.png')} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
            <Text style={styles.heading}>Terms and Conditions</Text>
            <Text style={styles.paragraph}>
                By using the Tourist Guide app, you agree to comply with and be bound
                by the following terms and conditions of use. Please review these terms
                carefully before using the app. If you do not agree with any part of
                these terms, you must not use the app.
            </Text>
            <Text style={styles.paragraph}>
                The content of the pages of this app is for your general information
                and use only. It is subject to change without notice.
            </Text>
            <Text style={styles.paragraph}>
                This app uses cookies to monitor browsing preferences. If you do allow
                cookies to be used, personal information may be stored by us for use by
                third parties.
            </Text>
            <Text style={styles.paragraph}>
                Neither we nor any third parties provide any warranty or guarantee as
                to the accuracy, timeliness, performance, completeness, or suitability
                of the information and materials found or offered in this app for any
                particular purpose.
            </Text>
            <Text style={styles.paragraph}>
                Your use of any information or materials in this app is entirely at
                your own risk, for which we shall not be liable. It shall be your own
                responsibility to ensure that any products, services, or information
                available through this app meet your specific requirements.
            </Text>
        </View>
    );
};

export default Terms;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: PRIMARY,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf:'center',
        color:'white'
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 15,
        color:'white'
    },
});

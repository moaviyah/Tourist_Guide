import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { PRIMARY } from '../colors';

const Privacy = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop:20}}>
                <Image source={require('../assets/back_white.png')} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
            <Text style={styles.heading}>Privacy Policy</Text>
            <Text style={styles.paragraph}>
                At Tourist Guide, we take your privacy seriously. This Privacy Policy
                outlines the types of personal information we receive and collect when
                you use our app, as well as how we safeguard your information.
            </Text>
            <Text style={styles.paragraph}>
                We may collect and use your location data to provide you with tailored
                recommendations and improve our services. Rest assured, your location
                information is only used for these purposes and is never shared with
                third parties.
            </Text>
            <Text style={styles.paragraph}>
                Additionally, we may collect non-personal information such as device
                information and usage statistics to analyze trends and improve the
                functionality of our app. This information is anonymized and used
                solely for internal purposes.
            </Text>
            <Text style={styles.paragraph}>
                Your privacy is our priority, and we are committed to protecting your
                personal information. If you have any questions or concerns about our
                Privacy Policy, please don't hesitate to contact us.
            </Text>
        </View>
    );
};

export default Privacy;

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
        color: 'white',
        alignSelf: 'center'
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 15,
        color: 'white'
    },
});

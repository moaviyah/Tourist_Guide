import React, { useEffect } from 'react';
import { StyleSheet, Text, Image, View, Dimensions, TouchableOpacity } from 'react-native';
import { PRIMARY, SECONDARY } from '../colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Splash = ({ navigation }) => {

    useEffect(() => {
        const timer = setTimeout(()=>{
            navigation.navigate('Login');
        }, 3000)

      return () => {
        clearTimeout(timer)
      }
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ backgroundColor: SECONDARY,padding:30, borderRadius:20, marginTop:height*0.15 }}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </TouchableOpacity>
            <Text style={styles.title}>Pakistan's Most Trusted Tourist App</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: PRIMARY,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        borderRadius: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 50,
        color: SECONDARY
    },
});

export default Splash;
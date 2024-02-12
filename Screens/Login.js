import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, Image, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { PRIMARY, SECONDARY } from '../colors';
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Perform input validation
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // Authenticate user with Firebase Authentication
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // User logged in successfully
                const user = userCredential.user;
                console.log('User logged in:', user);
                // You can navigate to another screen or perform other actions here
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
            });
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView>
                <Text style={styles.title}>Let's start your {'\n'}Journey together!</Text>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder='Enter your email' value={email} onChangeText={setEmail} autoCapitalize='none'/>
                    <TextInput style={styles.input} placeholder='Enter password' value={password} onChangeText={setPassword} secureTextEntry />
                </View>
                <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: PRIMARY, paddingVertical: 15, borderRadius: 25, alignItems: 'center' }}>
                    <Text style={{ color: SECONDARY, fontWeight: '600' }}>Login</Text>
                </TouchableOpacity>
                <Text style={{ alignSelf: 'center', marginVertical: 30 }}>Don't have an Account?</Text>
                <TouchableOpacity
                    style={{ borderWidth: 2, paddingVertical: 15, borderRadius: 25, alignItems: 'center', borderColor: PRIMARY }}
                    onPress={() => navigation.navigate('CreateAccount')}
                >
                    <Text style={{ color: PRIMARY, fontWeight: '600', }}>Create Account</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SECONDARY,
        padding: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10
    },
    logo: {
        height: height * 0.25,
        width: height * 0.25,
        alignSelf: 'center'
    },
    input: {
        borderWidth: 1,
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderColor: PRIMARY,
        paddingHorizontal: 20
    },
    inputContainer: {
        marginVertical: 30,
    }
});

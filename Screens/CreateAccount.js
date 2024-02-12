import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, Image, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { PRIMARY, SECONDARY } from '../colors';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from '../config'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CreateAccount = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCreateAccount = () => {
        // Perform input validation
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        // Create account with Firebase Authentication
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // User created successfully
                const user = userCredential.user;
                console.log('User created:', user);
                // You can navigate to another screen or perform other actions here
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 10 }}>
                        <Image source={require('../assets/back-white.png')} style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                    <Text style={{ color: SECONDARY, alignSelf: 'center', fontWeight: 'bold', fontSize: 16 }}>
                        Create Account
                    </Text>
                </View>
                <Image source={require('../assets/logo_white.png')} style={styles.logo} />
                <KeyboardAvoidingView style={{ marginTop: 20 }}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <TextInput placeholder='Enter Name' value={name} onChangeText={setName} style={styles.input} placeholderTextColor={'white'} />
                    <TextInput placeholder='Enter Email' value={email} onChangeText={setEmail} style={styles.input} placeholderTextColor={'white'} />
                    <TextInput placeholder='Enter Password' value={password} onChangeText={setPassword} placeholderTextColor={'white'} secureTextEntry style={styles.input} />
                    <TextInput placeholder='Confirm Password' value={confirmPassword} onChangeText={setConfirmPassword} placeholderTextColor={'white'} secureTextEntry style={styles.input} />
                </KeyboardAvoidingView>
                <TouchableOpacity onPress={handleCreateAccount} style={{ backgroundColor: 'white', paddingVertical: 15, borderRadius: 25, alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', color: PRIMARY }}>
                        Create Account
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

export default CreateAccount

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY,
        padding: 20,
    },
    logo: {
        height: height * 0.20,
        width: height * 0.20,
        alignSelf: 'center',
        marginVertical: 15
    },
    input: {
        borderWidth: 1,
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderColor: SECONDARY,
        paddingHorizontal: 20,
        color: 'white'
    },
});

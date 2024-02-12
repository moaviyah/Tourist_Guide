import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PRIMARY } from '../colors';
import { signOut,getAuth } from 'firebase/auth';
const Account = () => {
  // Dummy user data
  const user = {
    name: "John Doe",
    profilePicture: require('../assets/man.png')
  };
  const auth= getAuth()
  return (
    <View style={styles.container}>
      {/* User Info */}
      <View style={styles.userInfoContainer}>
        <Image source={user.profilePicture} style={styles.profilePicture} />
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab}>
          <Feather name="shield" size={24} color="#4CAF50" />
          <Text style={styles.tabText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Feather name="file-text" size={24} color="#1976D2" />
          <Text style={styles.tabText}>Terms and Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={()=>signOut(auth)}>
          <Feather name="log-out" size={24} color="#FF5252" />
          <Text style={styles.tabText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  tabsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    paddingTop: 30,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'white',
  },
});

export default Account;

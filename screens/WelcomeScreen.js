import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AppAfterAuth from './sub-screen/AppAfterAuth';
import { AuthContext } from '../store/auth-context';
import { BulbScreen } from './sub-screen/screens/BulbScreen';
import { FanScreen } from './sub-screen/screens/FanScreen';
import { SecurityScreen } from './sub-screen/screens/SecurityScreen';
import { FireScreen } from './sub-screen/screens/FireScreen';
import { MonitorScreen } from './sub-screen/screens/MonitorScreen';
import { HealthScreen } from './sub-screen/screens/HealthScreen';

function WelcomeScreen() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  const authCtx = useContext(AuthContext);

  function nextHandler() {
    navigation.navigate('AppAfterAuth');
  }

  function logoutHandler() {
    console.log("logout");
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome to SPF</Text>
      
      <TouchableOpacity
        style={styles.greenButton}
        onPress={nextHandler}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.redButton}
        onPress={authCtx.logout}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }} // Hide the header for WelcomeScreen
      />
      <Stack.Screen
        name="AppAfterAuth"
        component={AppAfterAuth}
        options={{
          title: 'Smart Poultry Farm System', // Set the title for the AppAfterAuth screen
          headerStyle: {
            backgroundColor: 'green', // Set the header background color
          },
          headerTintColor: 'white', // Set the text color in the header
        }}
      />

    
  
  
      <Stack.Screen name="BulbScreen" component={BulbScreen} />
      <Stack.Screen name="FanScreen" component={FanScreen} />
      <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
      <Stack.Screen name="FireScreen" component={FireScreen} />
      <Stack.Screen name="MonitorScreen" component={MonitorScreen} />
      <Stack.Screen name="HealthScreen" component={HealthScreen} />
    </Stack.Navigator>
  );
}

export default App;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  greenButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 10,
    marginTop: 16,
    width: 200, // Increase the width
    height: 60,  // Increase the height
  },
  redButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 10,
    marginTop: 16,
    width: 200, // Increase the width
    height: 60,  // Increase the height
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

import * as React from 'react';
import { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BottomSheet from 'react-native-raw-bottom-sheet';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Icon } from 'react-native-elements';

// npm i react-native-raw-bottom-sheet
// yarn add react-native-elements

function MapScreen() {
  const mapStyle = require('./src/styles/map.json');
  const bottomSheetRef = useRef();

  return (
    <View style={styles.container}>
      <MapView 
        customMapStyle={mapStyle}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} 
        >
          <Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={() => {
              bottomSheetRef.current.open();
            }}
          />
        </MapView>
      <View>
        <BottomSheet
          ref={bottomSheetRef}
          closeOnDragDown={true}
          height={300}
          openDuration={250}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f1f3f6',
              // alignItems: 'center',
              paddingTop: 50
            }}
          > 
            <Icon
              color='#333'
              name='user'
              type='font-awesome'
              size={20}
            />
            <Text style={{ fontSize: 20}}> Параша </Text>
            <Text style={{ fontSize: 20}}> Описание параши </Text>
          </View>
        </BottomSheet>
      </View>
    </View>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Notifications</Text>
      <Button
        onPress={() => navigation.navigate('Map')}
        title='Back'
      />
      <StatusBar style="auto" />
    </View>
  )
}
// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name='Map' component={MapScreen} />
        <Drawer.Screen name='Notifications' component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

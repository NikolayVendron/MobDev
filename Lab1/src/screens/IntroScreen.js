import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

export const IntroScreen = ({navigation}) => {

  const gameHandler = () => {
      navigation.navigate('Game')
  };

  return (
      <View style={styles.container}>
          <Text style={styles.text}>Кости</Text>
          <Text style={styles.dopText}>Проверьте свое везение</Text>
          <TouchableOpacity
              style={styles.goButton}
              onPress={gameHandler}
          >
              <Text style={styles.goButtonText}>Начать игру</Text>
          </TouchableOpacity>
      </View>
  )
};

IntroScreen.navigationOptions = {
    headerTitle: 'Главное меню'
};

const styles = StyleSheet.create({
   container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#162447',
   },
   text: {
       color: '#fff',
       fontSize: 30
   },
   goButton: {
       backgroundColor: '#e43f5a',
       borderRadius: 100,
       padding: 10,
       width: '30%',
       marginTop: 20
   },
   goButtonText: {
       color: '#fff',
       textAlign: 'center'
   },
   dopText: {
       color: '#e43f5a'
   }
});
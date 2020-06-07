import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import * as ImagePicker from 'expo-image-picker'
import * as Permission from 'expo-permissions'

export const IntroScreen = ({navigation}) => {

    async function askForPermission() {
        const {status} = await Permission.askAsync(
            Permission.CAMERA,
            Permission.CAMERA_ROLL
        );
        if (status !== 'granted') {
            Alert.alert('У вас нет прав!');
            return false
        }
        return true
    }

    const takePhotoHandler = async () => {
        const hasPermissions = await askForPermission();
        if (!hasPermissions) {
            return
        }

        const img = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: true,
            aspect: [16, 9]
        });

        navigation.navigate('Review', {image: img.uri})
    };

    return (
        <View style={styles.container}>
                <Text style={styles.text}>Фото редактор</Text>
                <TouchableOpacity
                    style={styles.goButton}
                    onPress={takePhotoHandler}
                >
                    <Text style={styles.goButtonText}>Сделать фото</Text>
                </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    text: {
        color: '#fff',
        fontSize: 32
    },
    goButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#fff',
        padding: 10,
        width: '50%',
        marginTop: 20
    },
    goButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

export const GameScreen = ({navigation}) => {

    const [computerScore, setComputerScore] = useState(null);
    const [firstComputerNumber, setFirstComputerNumber] = useState(null);
    const [secondComputerNumber, setSecondComputerNumber] = useState(null);

    const [playerScore, setPlayerScore] = useState(null);
    const [firstPlayerNumber, setFirstPlayerNumber] = useState(null);
    const [secondPlayerNumber, setSecondPlayerNumber] = useState(null);

    const playerRoll = () => {
        const firstPlayerNum = Math.floor(Math.random()*6) + 1;
        setFirstPlayerNumber(firstPlayerNum);
        const secPlayerNum = Math.floor(Math.random()*6) + 1;
        setSecondPlayerNumber(secPlayerNum);
        const finalPlayerNumber = firstPlayerNum + secPlayerNum;
        setPlayerScore(playerScore + finalPlayerNumber);

        const firstCompNum = Math.floor(Math.random()*6) + 1;
        setFirstComputerNumber(firstCompNum);
        const secCompNum = Math.floor(Math.random()*6) + 1;
        setSecondComputerNumber(secCompNum);
        const finalComputerNumber = firstCompNum + secCompNum;
        setComputerScore(computerScore + finalComputerNumber);
    };

    const onPlayerDouble = () => {
        const firstPlayerNum = Math.floor(Math.random()*6) + 1;
        setFirstPlayerNumber(firstPlayerNum);
        const secPlayerNum = Math.floor(Math.random()*6) + 1;
        setSecondPlayerNumber(secPlayerNum);
        const finalPlayerNumber = firstPlayerNum + secPlayerNum;
        setPlayerScore(playerScore + finalPlayerNumber);
    };

    const onComputerDouble = () => {
        const firstCompNum = Math.floor(Math.random()*6) + 1;
        setFirstComputerNumber(firstCompNum);
        const secCompNum = Math.floor(Math.random()*6) + 1;
        setSecondComputerNumber(secCompNum);
        const finalComputerNumber = firstCompNum + secCompNum;
        setComputerScore(computerScore + finalComputerNumber);
    };

    const goAgain = () => {
        navigation.navigate('Intro')
    };

    return (
        <View style={styles.container}>
            <View style={styles.computerGame}>
                <Text style={styles.header}>Компьютер</Text>
                <View style={styles.blocks}>
                    <View style={styles.computersBlock}>
                        <Text style={styles.resultText}>{firstComputerNumber}</Text>
                    </View>
                    <View style={styles.computersBlock}>
                        <Text style={styles.resultText}>{secondComputerNumber}</Text>
                    </View>
                </View>
                <Text>Ход компьютера: {firstComputerNumber + secondComputerNumber}</Text>
                <Text>Очки компьютера: {computerScore}</Text>
                {(firstComputerNumber === secondComputerNumber) && (firstComputerNumber !== null) && (secondComputerNumber !== null) ?
                    <TouchableOpacity style={styles.rollAgainButton} onPress={onComputerDouble}>
                        <Text style={styles.rollAgainButtonText}>Дубль, бросьте еще раз.</Text>
                    </TouchableOpacity>
                    : null
                }
            </View>
            <View style={styles.playerGame}>
                <Text style={styles.header}>Вы</Text>
                <View style={styles.blocks}>
                    <View style={styles.playersBlock}>
                        <Text style={styles.resultText}>{firstPlayerNumber}</Text>
                    </View>
                    <View style={styles.playersBlock}>
                        <Text style={styles.resultText}>{secondPlayerNumber}</Text>
                    </View>
                </View>
                <Text>Ваш ход: {firstPlayerNumber + secondPlayerNumber}</Text>
                <Text>Ваши очки: {playerScore}</Text>
                {(firstPlayerNumber === secondPlayerNumber) && (firstPlayerNumber !== null) && (secondPlayerNumber !== null) ?
                    <TouchableOpacity style={styles.rollAgainButton} onPress={onPlayerDouble}>
                        <Text style={styles.rollAgainButtonText}>Дубль, бросьте еще раз.</Text>
                    </TouchableOpacity>
                    : null
                }
            </View>
            {((firstPlayerNumber === secondPlayerNumber) || (firstComputerNumber === secondComputerNumber)) && (firstPlayerNumber !== null) ?
                <TouchableOpacity style={styles.throwButton} onPress={playerRoll} disabled={true}>
                    <Text style={styles.throwButtonText}>Бросьте снова</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={styles.throwButton} onPress={playerRoll} disabled={false}>
                    <Text style={styles.throwButtonText}>Бросьте снова</Text>
                </TouchableOpacity>
            }
            {(playerScore > 100) && (computerScore < 100) ?
                <View style={styles.result}>
                    <Text style={styles.resultHead}>Победа</Text>
                    <Text>Очки компьютера: {computerScore}</Text>
                    <Text>Ваши очки: {playerScore}</Text>
                    <TouchableOpacity style={styles.goAgainButton} onPress={goAgain}>
                        <Text style={styles.goAgainText}>Начать заного</Text>
                    </TouchableOpacity>
                </View> : null
            }
            {(playerScore < 100) && (computerScore > 100) ?
                <View style={styles.result}>
                    <Text style={styles.resultHead}>Поражение</Text>
                    <Text>Очки компьютера: {computerScore}</Text>
                    <Text>Ваши очки: {playerScore}</Text>
                    <TouchableOpacity style={styles.goAgainButton} onPress={goAgain}>
                        <Text style={styles.goAgainText}>Начать заного</Text>
                    </TouchableOpacity>
                </View> : null
            }
            {(playerScore > 100) && (computerScore > 100) ?
                <View style={styles.result}>
                    <Text style={styles.resultHead}>Ничья</Text>
                    <Text>Очки компьютера: {computerScore}</Text>
                    <Text>Ваши очки: {playerScore}</Text>
                    <TouchableOpacity style={styles.goAgainButton} onPress={goAgain}>
                        <Text style={styles.goAgainText}>Начать заного</Text>
                    </TouchableOpacity>
                </View> : null
            }
        </View>
    )
};

GameScreen.navigationOptions = {
    headerTitle: 'Игра'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#162447',
    },
    header: {
      fontSize: 18
    },
    blocks: {
        flexDirection: 'row'
    },
    computerGame: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#fff'
    },
    playerGame: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#fff'
    },
    computersBlock: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        marginHorizontal: 20,
    },
    resultText: {
      fontSize: 24
    },
    playersBlock: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        marginHorizontal: 20,
    },
    throwButton: {
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e43f5a'
    },
    throwButtonText: {
        color: '#fff'
    },
    rollAgainButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    rollAgainButtonText: {
        color: '#162447'
    },
    result: {
        position: 'absolute',
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    goAgainButton: {
        backgroundColor: '#162447',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10
    },
    goAgainText: {
        color: '#fff'
    },
    resultHead: {
        fontSize: 34,
        marginBottom: 10
    }
});
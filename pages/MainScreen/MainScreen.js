import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar';

export default function MainScreen() {
    const [score0, setScore0] = useState(0)
    const [score1, setScore1] = useState(0)
    const [set0, setSet0] = useState(0)
    const [set1, setSet1] = useState(0)

    const reset = () => {
        setScore0(0)
        setScore1(0)
        setSet0(0)
        setSet1(0)
    }

    useEffect(() => {
        if (set0 == 3) {
            reset()
            setScore0('Win')
        }
    }, [set0])

    useEffect(() => {
        if (set1 == 3) {
            reset()
            setScore1('Win')
        }
    }, [set1])

    useEffect(() => {
        if (set0 == 2 && set1 == 2) {
            Alert.alert(
                '',
                'Non me toquedes os collons estou traballando en eso',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            )
        }
    }, [set0, set1])

    const win0 = () => {
        switch (score0) {
            case 0:
                setScore0(15)
                if (score1 == 15) {
                    setScore1('Par')
                }
                break;
            case 15:
                setScore0(30)
                if (score1 == 'Par') {
                    setScore1(15)
                }
                if (score1 == 30) {
                    setScore1('Par')
                }
                break;
            case 30:
                setScore0(40)
                if (score1 == 'Par') {
                    setScore1(30)
                }
                if (score1 == 40) {
                    setScore1('Par')
                }
                break;
            case 40:
                if (score1 == 'Par') {
                    setScore1(40)
                    setScore0('Avantage')
                } else if (score1 < 40) {
                    setScore0(0)
                    setScore1(0)
                    setSet0(set0 + 1)
                } else if (score1 == 40) {
                    setScore0('Avantage')
                } else if (score0 == 'Avantage') {
                    setScore0(0)
                    setScore1(0)
                    setSet0(set0 + 1)
                } else if (score1 == 'Avantage') {
                    setScore1('Par')
                }
                break;
            case 'Avantage':
                setScore0(0)
                setScore1(0)
                setSet0(set0 + 1)
                break;
            default:
                break;
        }
    }

    const win1 = () => {
        switch (score1) {
            case 0:
                setScore1(15)
                if (score0 == 15) {
                    setScore1('Par')
                }
                break;
            case 15:
                setScore1(30)
                if (score0 == 30) {
                    setScore1('Par')
                }
                break;
            case 30:
                setScore1(40)
                if (score0 == 40) {
                    setScore1('Par')
                }
                break;
            case 40:
                if (score0 == 40) {
                    setScore1('Avantage')
                } else if (score0 < 40) {
                    setScore0(0)
                    setScore1(0)
                    setSet1(set1 + 1)
                } else if (score0 == 'Avantage') {
                    setScore0(40)
                    setScore1('Par')
                }
                break;
            case 'Avantage':
                setScore0(0)
                setScore1(0)
                setSet1(set1 + 1)
                break;
            case 'Par':
                switch (score0) {
                    case 15:
                        setScore1(30)
                        break;
                    case 30:
                        setScore1(40)
                        break;
                    case 40:
                        if (score0 < 40) {
                            setScore0(0)
                            setScore1(0)
                            setSet1(set1 + 1)
                        } else {
                            setScore1('Avantage')
                        }
                        break;

                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            {/* Scores and sets */}
            <View style={{ ...styles.score, ...{ 'left': '5%' } }}>
                <Text style={styles.text}>{score0}</Text>
            </View>
            <View style={{ ...styles.score, ...{ 'right': '5%' } }}>
                <Text style={styles.text}>{score1}</Text>
            </View>
            <View style={{ ...styles.set, ...{ 'left': '37%' } }}>
                <Text style={styles.text}>{set0}</Text>
            </View>
            <View style={{ ...styles.set, ...{ 'right': '37%' } }}>
                <Text style={styles.text}>{set1}</Text>
            </View>

            {/* Win buttons */}
            <Pressable style={{ ...styles.winBtn, ...{ 'left': '5%' } }} onPress={() => win0()}>
                <Text style={styles.text}>Win</Text>
            </Pressable>
            <Pressable style={{ ...styles.winBtn, ...{ 'right': '5%' } }} onPress={() => win1()}>
                <Text style={styles.text}>Win</Text>
            </Pressable>

            {/* Modify and Reset buttons */}
            {/*<Pressable style={{ ...styles.btn, ...{ 'left': '5%' } }}>
                <Text style={styles.text}>Modify Score</Text>
            </Pressable>*/}
            <Pressable style={{ ...styles.btn, ...{ 'right': '5%' } }} onPress={() => reset()}>
                <Text style={styles.text}>Reset</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    score: {
        backgroundColor: '#C9C9C9',
        width: '25%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '20%'
    },
    text: {
        fontSize: 30
    },
    set: {
        backgroundColor: '#C9C9C9',
        width: '10%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '20%'
    },
    winBtn: {
        backgroundColor: '#C9C9C9',
        width: '25%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '45%'
    },
    btn: {
        backgroundColor: '#C9C9C9',
        width: '40%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '70%'
    }
});

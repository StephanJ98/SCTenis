import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar';

export default function MainScreen() {
    const [score0, setScore0] = useState(0)
    const [score1, setScore1] = useState(0)
    const [set0, setSet0] = useState(0)
    const [set1, setSet1] = useState(0)
    const [tie0, setTie0] = useState(0)
    const [tie1, setTie1] = useState(0)

    const [showTiebreak, setShowTiebreak] = useState(true)

    const reset = () => {
        setScore0(0)
        setScore1(0)
        setSet0(0)
        setSet1(0)
    }

    const resetAndRollBack = () => {
        reset()
        setTie0(0)
        setTie1(0)
        setShowTiebreak(true)
    }

    useEffect(() => {
        if (set0 == 2 && set1 == 2) {
            Alert.alert(
                'TieBreak Escocés',
                '',
                [
                    { text: 'OK', onPress: () => setShowTiebreak(false) }
                ],
                { cancelable: false }
            )
        }
        if (set0 == 3) {
            reset()
            setScore0('Win')
        }
        if (set1 == 3) {
            reset()
            setScore1('Win')
        }
    }, [set0, set1])

    useEffect(() => {
        if (tie0 >= 7 && tie0 >= (tie1 + 2)) {
            resetAndRollBack()
            setScore0('Win')
        }
        if (tie1 >= 7 && tie1 >= (tie0 + 2)) {
            resetAndRollBack()
            setScore1('Win')
        }
    }, [tie0, tie1])

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
                    setScore0(40)
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
        showTiebreak ?
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

                {/* Reset button */}
                <Pressable style={styles.btn} onPress={() => reset()}>
                    <Text style={styles.text}>Reset</Text>
                </Pressable>
            </View>
            :
            <View style={styles.container}>
                <StatusBar style="auto" />

                {/* Scores and sets */}
                <View style={{ ...styles.set, ...{ 'left': '37%' } }}>
                    <Text style={styles.text}>{tie0}</Text>
                </View>
                <View style={{ ...styles.set, ...{ 'right': '37%' } }}>
                    <Text style={styles.text}>{tie1}</Text>
                </View>

                {/* Win buttons */}
                <Pressable style={{ ...styles.winBtn, ...{ 'left': '5%' } }} onPress={() => setTie0(tie0 + 1)}>
                    <Text style={styles.text}>Win</Text>
                </Pressable>
                <Pressable style={{ ...styles.winBtn, ...{ 'right': '5%' } }} onPress={() => setTie1(tie1 + 1)}>
                    <Text style={styles.text}>Win</Text>
                </Pressable>

                {/* Reset button */}
                <Pressable style={styles.btn} onPress={() => resetAndRollBack()}>
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

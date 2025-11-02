import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { colors as theme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { Animated, Easing } from 'react-native';

export const AuthScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    const ballTopAnim = useRef(new Animated.Value(0)).current; 
    const ballBotAnim = useRef(new Animated.Value(0)).current; 
    const clipAnim = useRef(new Animated.Value(0)).current; 
    const isAnimatingRef = useRef(false);

    useEffect(() => {
        Animated.stagger(120, [
            Animated.timing(ballTopAnim, {
                toValue: 1,
                duration: 520,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(ballBotAnim, {
                toValue: 1,
                duration: 520,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();

        Animated.timing(clipAnim, {
            toValue: 1,
            duration: 620,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }, [ballTopAnim, ballBotAnim, clipAnim]);

    const animateOutThenNavigate = (route: 'Login' | 'Register') => {
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;
        // Saída: conteúdo fecha (recorte) e shapes reduzem/fade
        Animated.parallel([
            Animated.timing(clipAnim, {
                toValue: 0,
                duration: 420,
                easing: Easing.in(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(ballTopAnim, {
                toValue: 0.85,
                duration: 360,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(ballBotAnim, {
                toValue: 0.85,
                duration: 360,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: true,
            }),
        ]).start(() => {
            navigation.navigate(route as never);
            // restaura valores para quando voltar
            ballTopAnim.setValue(1);
            ballBotAnim.setValue(1);
            clipAnim.setValue(1);
            isAnimatingRef.current = false;
        });
    };

    return (
        <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.select({ ios: 'padding', android: undefined })}
        >
            <Animated.View
                style={[
                    styles.ball,
                    {
                        opacity: ballTopAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
                        transform: [
                            { translateY: ballTopAnim.interpolate({ inputRange: [0, 1], outputRange: [-14, 0] }) },
                            { scale: ballTopAnim.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) },
                            { rotate: '12deg' },
                        ],
                    },
                ]}
            >
                <View style={styles.ballInner} />
            </Animated.View>
            <Animated.View
                style={[
                    styles.ball2,
                    {
                        opacity: ballBotAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
                        transform: [
                            { translateY: ballBotAnim.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) },
                            { scale: ballBotAnim.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) },
                            { rotate: '-12deg' },
                        ],
                    },
                ]}
            />

            <View style={styles.contentContainer}>
                <Animated.View style={styles.contentClip}>
                    <Animated.View
                        style={{
                            opacity: clipAnim,
                            transform: [
                                { translateY: clipAnim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) },
                                { scaleY: clipAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) },
                            ],
                        }}
                    >
                        <Text style={styles.helloTitle}>MentorFlow</Text>
                        <Text style={styles.helloSubtitle}>
                            Bem-vindo ao MentorFlow, organize e acompanhe o controle do estágio
                        </Text>

                        <View>
                            <Pressable
                                style={[styles.primaryButton, { marginTop: 24 }]}
                                onPress={() => animateOutThenNavigate('Login')}
                                android_ripple={{ color: '#ffffff33' }}
                            >
                                <Text style={styles.primaryButtonText}>Entrar</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.secondaryButton, { marginTop: 12 }]}
                                onPress={() => animateOutThenNavigate('Register')}
                                android_ripple={{ color: '#2563eb22' }}
                            >
                                <Text style={styles.secondaryButtonText}>Criar conta</Text>
                            </Pressable>
                        </View>

                        <View style={styles.dividerRow}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>ou</Text>
                            <View style={styles.divider} />
                        </View>

                        <Text style={styles.socialLabel}>Sign up using</Text>
                        <View style={styles.socialRow}>
                            <Pressable style={[styles.socialBtn, { borderColor: '#DB4437' }]} onPress={() => { /* TODO: Google Sign-In */ }} android_ripple={{ color: '#DB443722' }}>
                                <Text style={[styles.socialLetter, { color: '#DB4437' }]}>G</Text>
                            </Pressable>
                            <Pressable style={[styles.socialBtn, { borderColor: '#1877F2' }]} android_ripple={{ color: '#1877F222' }}>
                                <Text style={[styles.socialLetter, { color: '#1877F2' }]}>f</Text>
                            </Pressable>
                            <Pressable style={[styles.socialBtn, { borderColor: '#0A66C2' }]} android_ripple={{ color: '#0A66C222' }}>
                                <Text style={[styles.socialLetter, { color: '#0A66C2' }]}>in</Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                </Animated.View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    contentContainer: {
        width: '100%',
        maxWidth: 440,
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    contentClip: {
        width: '100%',
        alignItems: 'center',
        overflow: 'hidden',
    },
    helloTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: theme.text,
        marginBottom: 8,
        textAlign: 'center',
    },
    helloSubtitle: {
        fontSize: 14,
        color: theme.muted,
        textAlign: 'center',
        maxWidth: 420,
    },
    primaryButton: {
        backgroundColor: theme.primary,
        borderRadius: 14,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    primaryButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,
    },
    secondaryButton: {
        borderWidth: 1.5,
        borderColor: theme.primary,
        borderRadius: 14,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    secondaryButtonText: {
        color: theme.primary,
        fontWeight: '700',
        fontSize: 18,
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 16,
        marginBottom: 2,
    },
    divider: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
    dividerText: { color: theme.muted, fontSize: 12 },
    socialLabel: {
        marginTop: 16,
        color: theme.muted,
        fontSize: 12,
        textAlign: 'center',
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginTop: 10,
    },
    socialBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#fff',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    socialLetter: { fontWeight: '700' },
    ball: {
        position: 'absolute',
        top: -80,
        right: -40,
        width: 400,
        height: 200,
        borderRadius: 60,
        backgroundColor: theme.primary,
        transform: [{ rotate: '12deg' }],
    },
    ball2: {
        position: 'absolute',
        bottom: -80,
        left: -40,
        width: 400,
        height: 200,
        borderRadius: 60,
        backgroundColor: theme.primary,
        transform: [{ rotate: '-12deg' }],
    },
    ballInner: {
        position: 'absolute',
        width: 130,
        height: 75,
        top: 140,
        left: -30,
        margin: 20,
        borderRadius: 40,
        backgroundColor: '#f3f4f6',
        transform: [{ rotate: '30deg' }],
    },
});


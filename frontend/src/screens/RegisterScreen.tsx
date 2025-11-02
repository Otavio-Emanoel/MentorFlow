import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors as theme } from '../theme';

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPass, setFocusPass] = useState(false);

  // Mesma linguagem visual/animações da AuthScreen
  const ballTopAnim = useRef(new Animated.Value(0)).current;
  const ballBotAnim = useRef(new Animated.Value(0)).current;
  const clipAnim = useRef(new Animated.Value(0)).current;
  const isAnimatingRef = useRef(false);
  const itemAnims = useRef([
    new Animated.Value(0), // title
    new Animated.Value(0), // name
    new Animated.Value(0), // email
    new Animated.Value(0), // password
    new Animated.Value(0), // button
    new Animated.Value(0), // switch row
  ]).current;

  useEffect(() => {
    Animated.stagger(120, [
      Animated.timing(ballTopAnim, { toValue: 1, duration: 520, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(ballBotAnim, { toValue: 1, duration: 520, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();

    Animated.timing(clipAnim, { toValue: 1, duration: 620, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();

    Animated.stagger(80, itemAnims.map(a => Animated.timing(a, { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }))).start();
  }, [ballTopAnim, ballBotAnim, clipAnim]);

  const animateOutThenNavigate = (route: 'Login' | 'Auth' | 'Register' = 'Login') => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    Animated.parallel([
      Animated.stagger(40, itemAnims.map(a => Animated.timing(a, { toValue: 0, duration: 260, easing: Easing.in(Easing.cubic), useNativeDriver: true })).reverse()),
      Animated.timing(clipAnim, { toValue: 0, duration: 320, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
      Animated.timing(ballTopAnim, { toValue: 0.85, duration: 320, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      Animated.timing(ballBotAnim, { toValue: 0.85, duration: 320, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
    ]).start(() => {
      navigation.navigate(route as never);
      itemAnims.forEach(a => a.setValue(1));
      ballTopAnim.setValue(1);
      ballBotAnim.setValue(1);
      clipAnim.setValue(1);
      isAnimatingRef.current = false;
    });
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      {/* Shapes animados */}
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

      {/* Conteúdo com efeito de recorte */}
      <View style={styles.contentContainer}>
        <Animated.View style={styles.contentClip}>
          <Animated.View
            style={{
              opacity: clipAnim,
              transform: [
                { translateY: clipAnim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) },
                { scaleY: clipAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) },
              ],
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Animated.Text style={[styles.title, { opacity: itemAnims[0], transform: [{ translateY: itemAnims[0].interpolate({ inputRange: [0,1], outputRange: [8,0] }) }] }]}>Criar conta</Animated.Text>

            <Animated.View style={{ width: '100%', maxWidth: 420, opacity: itemAnims[1], transform: [{ translateY: itemAnims[1].interpolate({ inputRange: [0,1], outputRange: [8,0] }) }] }}>
              <TextInput value={name} onChangeText={setName} placeholder="Nome"
                onFocus={() => setFocusName(true)} onBlur={() => setFocusName(false)}
                style={[styles.input, focusName && styles.inputFocused]} />
            </Animated.View>

            <Animated.View style={{ width: '100%', maxWidth: 420, opacity: itemAnims[2], transform: [{ translateY: itemAnims[2].interpolate({ inputRange: [0,1], outputRange: [8,0] }) }] }}>
              <TextInput value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize="none" keyboardType="email-address"
                onFocus={() => setFocusEmail(true)} onBlur={() => setFocusEmail(false)}
                style={[styles.input, focusEmail && styles.inputFocused]} />
            </Animated.View>

            <Animated.View style={{ width: '100%', maxWidth: 420, opacity: itemAnims[3], transform: [{ translateY: itemAnims[3].interpolate({ inputRange: [0,1], outputRange: [8,0] }) }] }}>
              <TextInput value={password} onChangeText={setPassword} placeholder="Senha" secureTextEntry
                onFocus={() => setFocusPass(true)} onBlur={() => setFocusPass(false)}
                style={[styles.input, focusPass && styles.inputFocused]} />
            </Animated.View>

            <Animated.View style={{ width: '100%', maxWidth: 420, opacity: itemAnims[4], transform: [{ translateY: itemAnims[4].interpolate({ inputRange: [0,1], outputRange: [8,0] }) }], marginTop: 4 }}>
              <Pressable style={styles.primaryButton} onPress={() => {}} android_ripple={{ color: '#ffffff33' }}>
                <Text style={styles.primaryButtonText}>Cadastrar</Text>
              </Pressable>
            </Animated.View>

            <Animated.View style={{ opacity: itemAnims[5], transform: [{ translateY: itemAnims[5].interpolate({ inputRange: [0,1], outputRange: [8,0] }) }], marginTop: 12 }}>
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Já tem conta?</Text>
                <Pressable onPress={() => animateOutThenNavigate('Login')}>
                  <Text style={styles.linkText}>Entrar</Text>
                </Pressable>
              </View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6', padding: 16 },
  contentContainer: { width: '100%', maxWidth: 440, alignItems: 'center', paddingHorizontal: 8 },
  contentClip: { width: '100%', alignItems: 'center', overflow: 'hidden' },
  title: { fontSize: 28, fontWeight: '800', color: theme.text, textAlign: 'center', marginBottom: 12 },
  input: { width: '100%', maxWidth: 420, borderWidth: 1, borderColor: theme.border, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginTop: 6, marginBottom: 8, fontSize: 16, backgroundColor: '#fff' },
  inputFocused: { borderColor: theme.primary, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  primaryButton: { backgroundColor: theme.primary, borderRadius: 14, height: 56, alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 420, marginTop: 4 },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 18 },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 6, justifyContent: 'center' },
  switchLabel: { color: theme.muted, fontSize: 14 },
  linkText: { color: theme.primary, fontSize: 14, fontWeight: '700' },
  ball: { position: 'absolute', top: -80, right: -40, width: 400, height: 200, borderRadius: 60, backgroundColor: theme.primary, transform: [{ rotate: '12deg' }] },
  ball2: { position: 'absolute', bottom: -80, left: -40, width: 400, height: 200, borderRadius: 60, backgroundColor: theme.primary, transform: [{ rotate: '-12deg' }] },
  ballInner: { position: 'absolute', width: 130, height: 75, top: 140, left: -30, margin: 20, borderRadius: 40, backgroundColor: '#f3f4f6', transform: [{ rotate: '30deg' }] },
});

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated, Easing, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors as theme } from '../theme';

const { width } = Dimensions.get('window');

// Cores do app aplicadas às camadas animadas (inspirado no CSS enviado)
const LAYERS = [
	{ colors: [theme.primary, theme.primaryDark], opacity: 0.5, duration: 3000 },
	{ colors: ['#60a5fa', theme.primary], opacity: 0.4, duration: 4000 },
	{ colors: [theme.primaryDark, '#60a5fa'], opacity: 0.3, duration: 5000 },
];

export const SplashScreen: React.FC = () => {
	const navigation = useNavigation<any>();
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const scaleAnim = useRef(new Animated.Value(0.7)).current;
	const amplitude = 0.5 * width; // corresponde a translateX(-25%)..25% com largura 200%
	const slideAnims = LAYERS.map((_, i) => useRef(new Animated.Value(i % 2 ? amplitude : -amplitude)).current);

	useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 900,
				useNativeDriver: true,
				easing: Easing.out(Easing.exp),
			}),
			Animated.spring(scaleAnim, {
				toValue: 1,
				friction: 4,
				useNativeDriver: true,
			}),
			...slideAnims.map((anim, i) => {
				const first = i % 2 ? -amplitude : amplitude;
				const second = i % 2 ? amplitude : -amplitude;
				return Animated.loop(
					Animated.sequence([
						Animated.timing(anim, {
							toValue: first,
							duration: LAYERS[i].duration,
							useNativeDriver: true,
							easing: Easing.inOut(Easing.ease),
						}),
						Animated.timing(anim, {
							toValue: second,
							duration: LAYERS[i].duration,
							useNativeDriver: true,
							easing: Easing.inOut(Easing.ease),
						}),
					])
				);
			}),
		]).start();
		const t = setTimeout(() => navigation.replace('Auth'), 2000);
		return () => clearTimeout(t);
	}, [fadeAnim, scaleAnim, slideAnims, navigation]);

	return (
		<View style={styles.root}>
      {/* Camadas animadas de fundo, simulando .bg, .bg2, .bg3 */}
      {LAYERS.map((layer, i) => (
        <Animated.View
          key={i}
          pointerEvents="none"
          style={[styles.bgLayer, { opacity: layer.opacity, transform: [{ translateX: slideAnims[i] }] }]}
        >
					<LinearGradient
						colors={[layer.colors[0], layer.colors[0], layer.colors[1], layer.colors[1]]}
						locations={[0, 0.49, 0.5, 1]}
						// Aproximação de -60deg: direcionamos o gradiente de um canto ao oposto
						start={{ x: 1.1, y: 0 }}
						end={{ x: 0, y: 1.1 }}
						style={StyleSheet.absoluteFillObject}
					/>
        </Animated.View>
      ))}

			<View style={styles.content}>
				<Animated.View style={[styles.logoCircle, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}> 
					<Text style={styles.logoText}>MF</Text>
				</Animated.View>
				<Animated.Text style={[styles.title, { opacity: fadeAnim }]}>MentorFlow</Animated.Text>
				<Text style={styles.subtitle}>Conectando mentores e mentorados</Text>
				<ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 32 }} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.primary,
	},
	bgLayer: {
		...StyleSheet.absoluteFillObject,
		left: -0.5 * width,
		right: -0.5 * width,
	},
	content: {
		borderRadius: 16,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 32,
		shadowColor: theme.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.12,
		shadowRadius: 12,
		elevation: 8,
	},
	logoCircle: {
		width: 96,
		height: 96,
		borderRadius: 48,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: theme.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 8,
	},
	logoText: {
		fontSize: 40,
		fontWeight: 'bold',
		color: theme.primary,
		letterSpacing: 2,
		fontFamily: 'sans-serif-condensed',
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#e9ecf1ff',
		marginTop: 24,
		textShadowColor: '#2563eb99',
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 8,
	},
	subtitle: {
		fontSize: 16,
		color: '#adadadff',
		marginTop: 12,
		fontWeight: '500',
		textAlign: 'center',
		paddingHorizontal: 24,
	},
});

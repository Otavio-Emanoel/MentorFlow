import React from 'react';
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

export const AuthScreen: React.FC = () => {
	const navigation = useNavigation<any>();

	return (
		<KeyboardAvoidingView
			style={styles.root}
			behavior={Platform.select({ ios: 'padding', android: undefined })}
		>
			{/* Shapes superiores e inferiores no estilo anterior */}
			<View style={styles.ball}>
				<View style={styles.ballInner} />
			</View>
			<View style={styles.ball2} />

			<View style={styles.card}>
				<Text style={styles.helloTitle}>MentorFlow</Text>
				<Text style={styles.helloSubtitle}>
					Bem-vindo ao MentorFlow, organize e acompanhe o controle do estágio
				</Text>

				<Pressable style={[styles.primaryButton, { marginTop: 20 }]} onPress={() => navigation.navigate('Login')} android_ripple={{ color: '#ffffff33' }}>
					<Text style={styles.primaryButtonText}>Login</Text>
				</Pressable>
				<Pressable style={[styles.secondaryButton, { marginTop: 10 }]} onPress={() => navigation.navigate('Register')} android_ripple={{ color: '#2563eb22' }}>
					<Text style={styles.secondaryButtonText}>Sign Up</Text>
				</Pressable>

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
	card: {
		width: '100%',
		maxWidth: 420,
		backgroundColor: '#fff',
		borderRadius: 20,
		padding: 24,
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowRadius: 12,
		shadowOffset: { width: 0, height: 6 },
		elevation: 8,
		alignItems: 'center',
	},
	helloTitle: {
		fontSize: 28,
		fontWeight: '800',
		color: theme.text,
		marginBottom: 6,
	},
	helloSubtitle: {
		fontSize: 14,
		color: theme.muted,
		textAlign: 'center',
	},
	primaryButton: {
		backgroundColor: theme.primary,
		borderRadius: 12,
		paddingVertical: 12,
		alignItems: 'center',
		width: '100%',
	},
	primaryButtonText: {
		color: '#fff',
		fontWeight: '700',
		fontSize: 16,
	},
	secondaryButton: {
		borderWidth: 1,
		borderColor: theme.primary,
		borderRadius: 12,
		paddingVertical: 12,
		alignItems: 'center',
		width: '100%',
	},
	secondaryButtonText: {
		color: theme.primary,
		fontWeight: '700',
		fontSize: 16,
	},
	dividerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginTop: 14,
		marginBottom: 2,
	},
	divider: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
	dividerText: { color: theme.muted, fontSize: 12 },
	socialLabel: {
		marginTop: 16,
		color: theme.muted,
		fontSize: 12,
	},
	socialRow: {
		flexDirection: 'row',
		gap: 12,
		marginTop: 10,
	},
	socialBtn: {
		width: 40,
		height: 40,
		borderRadius: 20,
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


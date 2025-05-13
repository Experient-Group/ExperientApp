import CookieManager from '@react-native-cookies/cookies';
import React, { useContext, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { AuthContext, User } from '../../AuthContext';

export default function LoginScreen() {
    const { signIn } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async () => {
        if (username || password != '') {
            Alert.alert('Invalid Credentials');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(
                'https://timetracker-api.experient.com/auth/login',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                    credentials: 'include',
                }
            );

            const cookies = await CookieManager.get('https://timetracker-api.experient.com');
            //   const accessCookie  = cookies?.accessToken;
            //   const refreshCookie = cookies?.refreshToken;
            const accessCookie = {
                expires: Date.now() + 20 * 1000, // 5 seconds 
                value: 'abc123',
            };
            const refreshCookie = {
                expires: Date.now() + 5 * 1000,
                value: 'abc123',
            };

            const expiryTs = accessCookie?.expires
                ? new Date(accessCookie?.expires).getTime()
                : Date.now() + 1000 * 60;

            const { user: apiUser } = (await response.json()) as { user: User };
            const user: User = apiUser ?? {
                username: 'VShah',
                active: true,
                roleId: 20,
                dateCreated: '2018-03-02T00:00:00.000Z',
                dateModified: '2018-03-02T00:00:00.000Z',
                lastName: 'Shah',
                firstName: 'Viraj',
                displayName: 'Viraj Shah',
                jiraUsername: 'viraj.shah',
                intactUserId: 'EE-00112',
                userId: 41,
                emailAddress: 'vshah@experient.com',
                openAtCurWeeksTimesheet: true,
                activeInterviewer: true,
                createIntacctTimesheet: true,
                roleName: 'Developer',
            };

            await signIn(accessCookie?.value, refreshCookie?.value, user, expiryTs);

        } catch (err: any) {
            Alert.alert('Login failed', err.message || 'Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>

            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="you@example.com"
                autoCapitalize="none"
                autoCorrect={false}
                value={username}
                onChangeText={setUsername}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="••••••••"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {isSubmitting ? (
                <ActivityIndicator style={styles.spinner} size="large" />
            ) : (
                <Button title="Login" onPress={handleLogin} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        marginBottom: 32,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginTop: 12,
        marginBottom: 4,
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 12,
    },
    spinner: {
        marginTop: 24,
    },
});

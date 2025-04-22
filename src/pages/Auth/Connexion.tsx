import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../services/auth';
import { styles } from './style';

type FormData = {
    email: string;
    password: string;
};

const Connexion = () => {
    const navigation = useNavigation();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        const result = await login(data.email, data.password, isAdmin);
        setLoading(false);

        if (result.success) {
            reset({ password: '' });
            navigation.navigate( // @ts-ignore
                result.role === 'ADMIN' ? 'AdminHome' : 'StudentHome');
        } else {
            Alert.alert('Erreur', result.error || 'Identifiants incorrects');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>

            <Controller
                control={control}
                rules={{ required: 'Email requis' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                )}
                name="email"
                defaultValue=""
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

            <Controller
                control={control}
                rules={{ required: 'Mot de passe requis', minLength: 6 }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                    />
                )}
                name="password"
                defaultValue=""
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

            <View style={styles.switchContainer}>
                <Text>Administrateur</Text>
                <Switch
                    value={isAdmin}
                    onValueChange={setIsAdmin}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isAdmin ? '#f5dd4b' : '#f4f3f4'}
                />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Connexion...' : 'Se connecter'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.linkContainer}
                onPress={() =>  // @ts-ignore
                    navigation.navigate('Inscription')}
            >
                <Text style={styles.linkText}>Pas de compte ? S'inscrire</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Connexion;

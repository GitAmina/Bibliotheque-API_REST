import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { register } from '../../services/auth';
import { styles } from './style';

type FormData = {
    codeEtudiant: string;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Inscription = () => {
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>();
    const [loading, setLoading] = useState(false);
    const password = watch('password');

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        const etudiantData = {
            codeEtudiant: data.codeEtudiant,
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            motDePasse: data.password,
            nbrLivreEmprunter: 0
        };

        const result = await register(etudiantData);
        setLoading(false);

        if (result.success) {
            reset();
            Alert.alert(
                'Succès',
                'Inscription réussie !',
                [{ text: 'OK', onPress: () => // @ts-ignore
                        navigation.navigate('Connexion') }]
            );
        } else {
            Alert.alert('Erreur', result.error || "Erreur lors de l'inscription");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inscription</Text>

            <Controller
                control={control}
                rules={{ required: 'Code étudiant requis' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Code étudiant"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="codeEtudiant"
                defaultValue=""
            />
            {errors.codeEtudiant && <Text style={styles.errorText}>{errors.codeEtudiant.message}</Text>}

            <Controller
                control={control}
                rules={{ required: 'Nom requis' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Nom"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="nom"
                defaultValue=""
            />
            {errors.nom && <Text style={styles.errorText}>{errors.nom.message}</Text>}

            <Controller
                control={control}
                rules={{ required: 'Prénom requis' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Prénom"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="prenom"
                defaultValue=""
            />
            {errors.prenom && <Text style={styles.errorText}>{errors.prenom.message}</Text>}

            <Controller
                control={control}
                rules={{
                    required: 'Email requis',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email invalide'
                    }
                }}
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

            <Controller
                control={control}
                rules={{
                    required: 'Confirmation requise',
                    validate: value => value === password || 'Les mots de passe ne correspondent pas'
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmer le mot de passe"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                    />
                )}
                name="confirmPassword"
                defaultValue=""
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

            <TouchableOpacity
                style={styles.buttonins}
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Inscription...' : "S'inscrire"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.linkContainer}
                onPress={() => // @ts-ignore
                    navigation.navigate('Connexion')}
            >
                <Text style={styles.linkText}>Déjà un compte ? Se connecter</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Inscription;

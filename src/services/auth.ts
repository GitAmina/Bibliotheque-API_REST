import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.11.101:8080/bibliotheque/api/auth';

export const login = async (email: string, password: string, isAdmin: boolean) => {
    try {
        const endpoint = isAdmin ? '/admin/login' : '/etudiant/login';
        const response = await axios.post(`${API_URL}${endpoint}`, {
            email,
            motDePasse: password
        });

        await AsyncStorage.multiSet([
            ['token', response.data.token],
            ['role', isAdmin ? 'ADMIN' : 'ETUDIANT'],
            ['email', email]
        ]);

        return { success: true, role: isAdmin ? 'ADMIN' : 'ETUDIANT' };
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        return { success: false, error: error.response?.data || 'Erreur de connexion' };
    }
};

export const register = async (etudiantData: {
    codeEtudiant: string;
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
}) => {
    try {
        const response = await axios.post('http://192.168.11.101:8080/bibliotheque/api/etudiants', {
            ...etudiantData,
            nbrLivreEmprunter: 0
        });
        return { success: true };
    } catch (error) {
        console.error('Register error:', error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data || "Erreur d'inscription"
        };
    }
};

export const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');
};

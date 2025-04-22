import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.11.103:8080/bibliotheque/api/administrateurs';

export const getAdminProfile = async () => {
    try {
        const email = await AsyncStorage.getItem('email');
        const token = await AsyncStorage.getItem('token');

        if (!token || !email) {
            throw new Error('Authentication required');
        }

        console.log("Informations recuperées avec succes");

        const response = await axios.get(`${API_URL}/email/${encodeURIComponent(email)}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 5000
            }
        );

        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération du profil');
        throw new Error('Impossible de charger le profil');
    }
};

export const updateAdminProfile = async (id: number, updates: { [key: string]: any }) => {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.patch(
        `${API_URL}/${id}`,
        updates,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
};

export const changePassword = async (id: number, newPassword: string) => {
    return updateAdminProfile(id, { motDePasse: newPassword });
};

export const deleteAdminAccount = async (id: number) => {
    try {
        const token = await AsyncStorage.getItem('token');

        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error deleting student account:', error);
        throw error;
    }
};

export const addAdmin = async (adminData: {
    nom: string;
    prenom: string;
    email: string;
}) => {
    const token = await AsyncStorage.getItem('token');
    try {
        const payload = {
            ...adminData,
            motDePasse: "Aminata1"
        };

        const response = await axios.post(
            `${API_URL}`,
            payload, // Envoi des données complètes
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 5000
            }
        );
        return response.data;
    } catch (error) {
        const errorMessage = axios.isAxiosError(error)
            ? error.response?.data?.message || error.message
            : "Erreur lors de l'ajout";
        throw new Error(errorMessage);
    }
};

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.11.107:8080/bibliotheque/api';

interface Livre {
    idL: number;
    titre: string;
    auteur: string;
    genre: string;
    annee: number;
    disponibilite: boolean;
}

export const fetchBooks = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${API_URL}/livres`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

export const addBook = async (bookData: {
    titre: string;
    auteur: string;
    genre: string;
    annee: number;
    description?: string | null;
}) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error("Token non trouvé");


        if (bookData.annee < 0 || bookData.annee > new Date().getFullYear()) {
            throw new Error("Année invalide");
        }

        const response = await axios.post(
            `${API_URL}/livres`,
            {
                ...bookData,
                description: bookData.description?.trim() || null,
                disponibilite: true
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 10000
            }
        );

        return response.data;
    } catch (error) {
        let errorMessage = "Erreur lors de l'ajout du livre";
        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message;
            console.error("Détails de l'erreur:", {
                status: error.response?.status,
                data: error.response?.data
            });
        }
        throw new Error(errorMessage);
    }
};

export const updateBook = async (id: number, updates: {
    titre?: string;
    auteur?: string;
    genre?: string;
    annee?: number;
    description?: string | null;
}) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error("Authentification requise");

        const response = await axios.patch(
            `${API_URL}/livres/${id}`,
            updates,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        const message = axios.isAxiosError(error)
            ? error.response?.data?.message || error.message
            : "Erreur lors de la modification";
        throw new Error(message);
    }
};

export const deleteBook = async (id: number) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error("Authentification requise");

        await axios.delete(`${API_URL}/livres/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        const message = axios.isAxiosError(error)
            ? error.response?.data?.message || error.message
            : "Erreur lors de la suppression";
        throw new Error(message);
    }
};

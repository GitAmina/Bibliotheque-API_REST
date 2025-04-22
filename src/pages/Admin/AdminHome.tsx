import React, { useState, useCallback } from 'react';
import {View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchBooks } from '../../services/books';
import { logout } from '../../services/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './style/style'
import { useFocusEffect } from '@react-navigation/native';

const AdminHome = () => {
    const navigation = useNavigation();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const loadBooks = async () => {
        setLoading(true);
        try {
            const booksData = await fetchBooks();
            setBooks(booksData);
        } catch (error) {
            Alert.alert('Erreur', 'Impossible de charger les livres');
            console.error('Failed to load books:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadBooks();
        }, [])
    );

    const handleLogout = async () => {
        await logout();
        // @ts-ignore
        navigation.navigate('Connexion');
    };

    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={toggleDrawer}>
                    <Icon name="menu" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bibliothèque</Text>
                <View style={{ width: 30 }} />
            </View>

            {/* Side Drawer */}
            {drawerOpen && (
                <View style={styles.drawer}>
                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={() => {
                            // @ts-ignore
                            navigation.navigate('Ajouter Admin');
                            setDrawerOpen(false);
                        }}
                    >
                        <Text style={styles.drawerText}>Ajouter Admin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={() => {
                            // @ts-ignore
                            navigation.navigate('Ajouter Livre');
                            setDrawerOpen(false);
                        }}
                    >
                        <Text style={styles.drawerText}>Ajouter Livre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={() => {
                            // @ts-ignore
                            navigation.navigate('Les Emprunts');
                            setDrawerOpen(false);
                        }}
                    >
                        <Text style={styles.drawerText}>Emprunts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={() => {
                            // @ts-ignore
                            navigation.navigate('Rechercher');
                            setDrawerOpen(false);
                        }}
                    >
                        <Text style={styles.drawerText}>Rechercher Livre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={() => {
                            // @ts-ignore
                            navigation.navigate('Rechercher Etudiant');
                            setDrawerOpen(false);
                        }}
                    >
                        <Text style={styles.drawerText}>Rechercher Etudiant</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={() => {
                            // @ts-ignore
                            navigation.navigate('Mon Profile');
                            setDrawerOpen(false);
                        }}
                    >
                        <Text style={styles.drawerText}>Mon Profil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={handleLogout}
                    >
                        <Text style={styles.drawerText}>Déconnexion</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Main Content */}
            <ScrollView style={styles.content}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#6a1b9a" />
                    </View>
                ) : books.length === 0 ? (
                    <Text style={styles.emptyText}>Aucun livre disponible</Text>
                ) : (
                    <View style={styles.booksContainer}>
                        {books.map((book) => (
                            <TouchableOpacity
                                key={book.idL}
                                style={styles.bookCard}
                                onPress={() => // @ts-ignore
                                    navigation.navigate('Details livre', {
                                    book,
                                    onBookUpdated: loadBooks,
                                    onBookDeleted: loadBooks
                                })}
                            >
                                <Text style={styles.bookTitle} numberOfLines={2}>{book.titre}</Text>
                                <Text style={styles.bookAuthor} numberOfLines={1}>Auteur: {book.auteur}</Text>
                                <Text style={styles.bookInfo}>Genre: {book.genre}</Text>
                                <Text style={styles.bookInfo}>Année: {book.annee}</Text>

                                {/* Nouveau style pour le statut */}
                                <View style={styles.statusContainer}>
                                    <View style={[
                                        styles.statusDot,
                                        book.disponibilite ? styles.available : styles.unavailable
                                    ]} />
                                    <Text style={styles.statusText}>
                                        {book.disponibilite ? 'Disponible' : 'Indisponible'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default AdminHome;

import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationParameter } from "../features/navigation";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';

export default function ListarAtividades({ navigation }: NavigationParameter<"ListarAtividades">) {

    const alertSair = () => Alert.alert('Atenção', 'Você tem certeza que deseja sair da sua conta?');
    const Editar = (id: string) => {
        Alert.alert('Editar', 'Visualizando atividade ' + id);
    }

    const excluir = (id: string) => {
        Alert.alert(
            'Atenção',
            'Deseja realmente excluir esta atividade?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', style: 'destructive', onPress: () => console.log('Excluir', id) }
            ]
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#8b9fc0ff' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo} />
                    <View style={styles.headerRight}>
                        <Text style={styles.title}>Atividades | Nome prof</Text>
                        <Text style={styles.subtitle}>3ºA</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.BotaoNovo}
                    onPress={() => navigation.navigate('CadastroAtividade')}
                >
                    <Text style={styles.txtBotaoNovo}>Nova Atividade</Text>
                </TouchableOpacity>

                <ScrollView style={styles.listaContainer} contentContainerStyle={{ paddingBottom: 24 }}>

                        <View style={styles.atividadeCard}>
                            <View style={styles.atividadeHeader}>
                                <Text style={styles.atividadeTitulo}>Trabalho de Matemática</Text>
                            </View>

                            <Text style={styles.atividadeDescricao}>Resolução de exercícios sobre funções quadráticas</Text>
                            
                            <View style={styles.atividadeFooter}>
                                <Text style={styles.atividadeInfo}>
                                    <Text style={styles.infoLabel}>ID: </Text>
                                    at8k9p2m
                                </Text>
                                <Text style={styles.atividadeInfo}>
                                    <Text style={styles.infoLabel}>Entrega: </Text>
                                    10/11/2025
                                </Text>
                            </View>

                            <View style={styles.acoes}>
                                <TouchableOpacity 
                                    style={styles.BotaoEditar}
                                    onPress={() => Editar('at8k9p2m')}
                                >
                                    <Text style={styles.txtBotao}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.BotaoExcluir}
                                    onPress={() => excluir('at8k9p2m')}
                                >
                                    <Text style={styles.txtBotao}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.atividadeCard}>
                            <View style={styles.atividadeHeader}>
                                <Text style={styles.atividadeTitulo}>Prova Bimestral</Text>
                            </View>

                            <Text style={styles.atividadeDescricao}>Avaliação sobre todo o conteúdo do bimestre</Text>
                            
                            <View style={styles.atividadeFooter}>
                                <Text style={styles.atividadeInfo}>
                                    <Text style={styles.infoLabel}>ID: </Text>
                                    bt7h4n9k
                                </Text>
                                <Text style={styles.atividadeInfo}>
                                    <Text style={styles.infoLabel}>Entrega: </Text>
                                    15/11/2025
                                </Text>
                            </View>

                            <View style={styles.acoes}>
                                <TouchableOpacity 
                                    style={styles.BotaoEditar}
                                    onPress={() => Editar('bt7h4n9k')}
                                >
                                    <Text style={styles.txtBotao}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.BotaoExcluir}
                                    onPress={() => excluir('bt7h4n9k')}
                                >
                                    <Text style={styles.txtBotao}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.atividadeCard}>
                            <View style={styles.atividadeHeader}>
                                <Text style={styles.atividadeTitulo}>Lista de Exercícios</Text>
                            </View>

                            <Text style={styles.atividadeDescricao}>Exercícios de revisão para a prova</Text>
                            
                            <View style={styles.atividadeFooter}>
                                <Text style={styles.atividadeInfo}>
                                    <Text style={styles.infoLabel}>ID: </Text>
                                    ct5m2x8j
                                </Text>
                                <Text style={styles.atividadeInfo}>
                                    <Text style={styles.infoLabel}>Entrega: </Text>
                                    12/11/2025
                                </Text>
                            </View>

                            <View style={styles.acoes}>
                                <TouchableOpacity 
                                    style={styles.BotaoEditar}
                                    onPress={() => Editar('ct5m2x8j')}
                                >
                                    <Text style={styles.txtBotao}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.BotaoExcluir}
                                    onPress={() => excluir('ct5m2x8j')}
                                >
                                    <Text style={styles.txtBotao}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.BotaoSair} onPress={alertSair}>
                                            <Text style={styles.txtBotaoSair}>Sair</Text>
                                        </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
     BotaoSair: {
        marginTop: 12,
        alignSelf: 'stretch',
        backgroundColor: '#083067',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: 'center'
    },
    txtBotaoSair: { color: '#fff', fontWeight: '600' },

    container: {
        flex: 1,
        backgroundColor: '#8b9fc0ff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    logo: {
        width: 64,
        height: 64,
        resizeMode: 'contain',
        marginRight: 12
    },
    headerRight: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700'
    },
    subtitle: {
        color: '#fff',
        fontSize: 14,
        marginTop: 4
    },
    BotaoNovo: {
        backgroundColor: '#1E5CC8',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12
    },
    txtBotaoNovo: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    },
    listaContainer: {
        flex: 1
    },
    atividadeCard: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    atividadeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    atividadeTitulo: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0B3D91',
        flex: 1,
        marginRight: 8
    },
    atividadeDescricao: {
        color: '#666666',
        marginBottom: 12,
        fontSize: 14
    },
    atividadeFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    atividadeInfo: {
        fontSize: 14,
        color: '#666666'
    },
    infoLabel: {
        color: '#0B3D91',
        fontWeight: '600'
    },
    acoes: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    BotaoEditar: {
        backgroundColor: '#1E5CC8',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginRight: 8
    },
    BotaoExcluir: {
        backgroundColor: '#D9534F',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6
    },
    txtBotao: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14
    }
});
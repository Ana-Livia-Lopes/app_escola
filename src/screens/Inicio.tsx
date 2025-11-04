import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Inicio() {

    const alertCadastroTurma = () => Alert.alert('Atenção', 'vou fazer ainda');
    const alerteditarTurma = () => Alert.alert('Atenção', 'vou fazer ainda');
    const alertExcluirTurma = () => Alert.alert('Atenção', 'Você tem certeza que deseja excluir esta turma?');
    const alertSair = () => Alert.alert('Atenção', 'Você tem certeza que deseja sair da sua conta?');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#8b9fc0ff" }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo} />
                    <View style={styles.headerRight}>
                        <Text style={styles.profNome}>{'luisão (felipe cardoso)'}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.BotaoCadastrar} onPress={alertCadastroTurma}>
                    <Text style={styles.txtBotaoCadastrar}>Cadastrar turma</Text>
                </TouchableOpacity>

                <Text style={styles.tituloLista}>Minhas turmas</Text>

                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
                    <View style={styles.turma}>
                        <View style={styles.info}>
                            <Text style={styles.nomeTurma}>3ºA</Text>
                            <Text style={styles.tag}>gh6fs02j</Text>
                        </View>
                        <View style={styles.acoes}>
                            <TouchableOpacity style={styles.BotaoEditar} onPress={alerteditarTurma}>
                                <Text style={styles.txtBotao}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.BotaoExcluir} onPress={alertExcluirTurma}>
                                <Text style={styles.txtBotao}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.turma}>
                        <View style={styles.info}>
                            <Text style={styles.nomeTurma}>3ºB</Text>
                            <Text style={styles.tag}>f8sm30sx</Text>
                        </View>
                        <View style={styles.acoes}>
                            <TouchableOpacity style={styles.BotaoEditar} onPress={alerteditarTurma}>
                                <Text style={styles.txtBotao}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.BotaoExcluir} onPress={alertExcluirTurma}>
                                <Text style={styles.txtBotao}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.turma}>
                        <View style={styles.info}>
                            <Text style={styles.nomeTurma}>2ºC</Text>
                            <Text style={styles.tag}>l8sg5cj1</Text>
                        </View>
                        <View style={styles.acoes}>
                            <TouchableOpacity style={styles.BotaoEditar} onPress={alerteditarTurma}>
                                <Text style={styles.txtBotao}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.BotaoExcluir} onPress={alertExcluirTurma}>
                                <Text style={styles.txtBotao}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                <TouchableOpacity style={styles.BotaoSair} onPress={alertSair}>
                    <Text style={styles.txtBotaoSair}>Sair</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    profNome: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600'
    },
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

    BotaoCadastrar: {
        backgroundColor: '#1E5CC8',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12
    },
    txtBotaoCadastrar: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },

    tituloLista: {
        color: '#EAF2FF',
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '700'
    },

    turma: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    info: {
        flex: 1
    },
    tag: {
        color: '#0B3D91',
        marginTop: 4
    },
    nomeTurma: {
        color: '#0B3D91',
        fontWeight: '700'
    },

    acoes: {
        flexDirection: 'row'
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
        fontWeight: '700'
    },
});

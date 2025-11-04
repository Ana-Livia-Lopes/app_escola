import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationParameter } from "../features/navigation";
import Professor from '../features/professor';

export default function Inicio({ navigation }: NavigationParameter<"Inicio">) {

    const [modalEditarVisible, setModalEditarVisible] = useState(false);

    const alertExcluirTurma = () => Alert.alert(
        'Atenção',
        'Deseja realmente excluir a turma?',
        [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim, excluir', style: 'destructive', onPress: () => Alert.alert('Excluído', 'Turma excluída') }
        ]
    );

    const alertSair = () => Professor.sair().then(() => navigation.navigate("Autenticacao"));

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#8b9fc0ff" }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo} />
                    <View style={styles.headerRight}>
                        <Text style={styles.profNome}>{Professor.professor!.nome}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.BotaoCadastrar} onPress={() => navigation.navigate('CadastroTurma')}>
                    <Text style={styles.txtBotaoCadastrar}>Cadastrar turma</Text>
                </TouchableOpacity>

                <Text style={styles.tituloLista}>Minhas turmas</Text>

                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
                    <TouchableOpacity style={styles.turma} onPress={() => navigation.navigate('ListarAtividades')} activeOpacity={0.9}>
                        <View style={styles.info}>
                            <Text style={styles.nomeTurma}>3ºA</Text>
                            <Text style={styles.tag}>gh6fs02j</Text>
                        </View>
                        <View style={styles.acoes}>
                            <TouchableOpacity style={styles.BotaoEditar} onPress={() => setModalEditarVisible(true)}>
                                <Text style={styles.txtBotao}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.BotaoExcluir} onPress={() => alertExcluirTurma()}>
                                <Text style={styles.txtBotao}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.turma} onPress={() => navigation.navigate('ListarAtividades')} activeOpacity={0.9}>
                        <View style={styles.info}>
                            <Text style={styles.nomeTurma}>3ºB</Text>
                            <Text style={styles.tag}>f8sm30sx</Text>
                        </View>
                        <View style={styles.acoes}>
                            <TouchableOpacity style={styles.BotaoEditar} onPress={() => setModalEditarVisible(true)}>
                                <Text style={styles.txtBotao}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.BotaoExcluir} onPress={() => alertExcluirTurma()}>
                                <Text style={styles.txtBotao}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.turma} onPress={() => navigation.navigate('ListarAtividades')} activeOpacity={0.9}>
                        <View style={styles.info}>
                            <Text style={styles.nomeTurma}>2ºC</Text>
                            <Text style={styles.tag}>l8sg5cj1</Text>
                        </View>
                        <View style={styles.acoes}>
                            <TouchableOpacity style={styles.BotaoEditar} onPress={() => setModalEditarVisible(true)}>
                                <Text style={styles.txtBotao}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.BotaoExcluir} onPress={() => alertExcluirTurma()}>
                                <Text style={styles.txtBotao}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

                

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalEditarVisible}
                    onRequestClose={() => setModalEditarVisible(false)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Editar Turma</Text>
                            <Text style={styles.label}>Nome da Turma</Text>
                            <TextInput style={styles.input} placeholder="Ex: 3ºA" defaultValue="3ºA" />
                            <Text style={styles.label}>Quantidade</Text>
                            <TextInput style={styles.input} placeholder="Ex: 30" keyboardType='numeric'/>
                            <Text style={styles.label}>Disciplina</Text>
                            <TextInput style={styles.input} placeholder="Ex: Matemática" />

                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={[styles.modalButton, styles.buttonCancel]} onPress={() => setModalEditarVisible(false)}>
                                    <Text style={styles.textButtonCancel}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.modalButton, styles.buttonConfirm]} onPress={() => setModalEditarVisible(false)}>
                                    <Text style={styles.textButtonConfirm}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

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

    // Estilos do Modal
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0B3D91',
        marginBottom: 12,
        textAlign: 'center'
    },
    label: {
        fontSize: 14,
        color: '#0B3D91',
        marginBottom: 6,
        fontWeight: '600'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
        fontSize: 16
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6
    },
    modalButton: {
        flex: 1,
        padding: 10,
        borderRadius: 6,
        marginHorizontal: 6,
        alignItems: 'center'
    },
    buttonCancel: {
        backgroundColor: '#D9534F'
    },
    buttonConfirm: {
        backgroundColor: '#1E5CC8'
    },
    textButtonCancel: {
        color: '#fff',
        fontWeight: '700'
    },
    textButtonConfirm: {
        color: '#fff',
        fontWeight: '700'
    }
});

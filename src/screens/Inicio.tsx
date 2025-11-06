import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationParameter } from "../features/navigation";
import Professor from '../features/professor';
import Turma from '../features/turma';
import { Status } from '../features/result';

export default function Inicio({ navigation }: NavigationParameter<"Inicio">) {

    const [modalEditarVisible, setModalEditarVisible] = useState(false);
    const [turmas, setTurmas] = useState<Turma[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedTurma, setSelectedTurma] = useState<Turma | null>(null);
    const [editNome, setEditNome] = useState('');
    const [editDisciplina, setEditDisciplina] = useState('');
    const [editQuantidade, setEditQuantidade] = useState('');
    const [editTag, setEditTag] = useState('');
    const [savingEdit, setSavingEdit] = useState(false);

    

    const alertSair = () => Professor.sair().then(() => navigation.navigate("Autenticacao"));

    const carregarTurmas = async () => {
        setLoading(true);
        try {
            const res = await Turma.listar();
            console.log('Resposta do listar:', res); // Debug
            if (res.status === Status.okay && res.resultado) {
                console.log('Turmas encontradas:', res.resultado.length); // Debug
                setTurmas(res.resultado);
            } else {
                console.log('Erro ao listar:', res.mensagem); // Debug
                Alert.alert('Erro', res.mensagem || 'Não foi possível carregar as turmas');
            }
        } catch (e: any) {
            console.log('Erro ao listar:', e); // Debug
            Alert.alert('Erro', e?.message || 'Erro desconhecido ao listar turmas');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Recarrega as turmas sempre que a tela recebe foco
            carregarTurmas();
        });

        // Carrega turmas na montagem inicial
        carregarTurmas();

        // Limpa o listener quando o componente for desmontado
        return unsubscribe;
    }, [navigation]);

    const confirmarExcluir = (turma: Turma) => {
        Alert.alert(
            'Atenção',
            `Deseja realmente excluir a turma ${turma.nome}?`,
            [
                { text: 'Não', style: 'cancel' },
                { 
                    text: 'Sim, excluir', 
                    style: 'destructive', 
                    onPress: async () => {
                        try {
                            console.log('Iniciando exclusão da turma:', turma.id);
                            const res = await turma.excluir();
                            
                            if (res.status === Status.okay) {
                                console.log('Exclusão bem sucedida, atualizando lista');
                                // Remove da lista local
                                setTurmas(prev => prev.filter(t => t.id !== turma.id));
                                Alert.alert('Excluído', 'Turma excluída com sucesso');
                            } else {
                                console.log('Erro na exclusão:', res.mensagem);
                                Alert.alert('Erro', res.mensagem || 'Não foi possível excluir a turma');
                            }
                        } catch (e: any) {
                            console.log('Erro ao tentar excluir:', e);
                            Alert.alert('Erro', 'Erro inesperado ao tentar excluir a turma');
                        }
                    }
                }
            ]
        );
    }

    const abrirEditar = (turma: Turma) => {
        setSelectedTurma(turma);
        setEditNome(turma.nome ?? '');
        setEditDisciplina(turma.disciplina ?? '');
        setEditQuantidade(String((turma as any).quantidadeAlunos ?? ''));
        setEditTag(turma.tag ?? '');
        setModalEditarVisible(true);
    }

    const salvarEdicao = async () => {
        if (!selectedTurma) return;

        if (!editNome.trim() || !editDisciplina.trim() || !editTag.trim() || !editQuantidade.trim()) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios');
            return;
        }

        const qtd = parseInt(editQuantidade);
        if (isNaN(qtd) || qtd < 0) {
            Alert.alert('Erro', 'Quantidade inválida');
            return;
        }

        setSavingEdit(true);
        try {
            const res = await selectedTurma.editar(editNome, editDisciplina, editTag, qtd);
            if (res.status === Status.okay && res.resultado) {
                setTurmas(prev => prev.map(t => t.id === selectedTurma.id ? res.resultado! : t));
                Alert.alert('Sucesso', 'Turma atualizada');
                setModalEditarVisible(false);
                setSelectedTurma(null);
            } else {
                Alert.alert('Erro', res.mensagem || 'Não foi possível atualizar a turma');
            }
        } catch (e: any) {
            console.log('Erro ao editar turma:', e);
            Alert.alert('Erro', 'Erro inesperado ao editar a turma');
        } finally {
            setSavingEdit(false);
        }
    }

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
                    {loading ? (
                        <Text style={{ color: '#fff', marginTop: 8 }}>Carregando turmas...</Text>
                    ) : (
                        <>
                            {turmas.map((turma) => (
                                <TouchableOpacity key={turma.id} style={styles.turma} onPress={() => (navigation as any).navigate('ListarAtividades', { turmaId: turma.id, turmaNome: turma.nome })} activeOpacity={0.9}>
                                    <View style={styles.info}>
                                        <Text style={styles.nomeTurma}>{turma.nome}</Text>
                                        <Text style={styles.disciplina}>{turma.disciplina}</Text>
                                        <Text style={styles.tag}>{turma.tag}</Text>
                                    </View>
                                    <View style={styles.acoes}>
                                        <TouchableOpacity style={styles.BotaoEditar} onPress={() => abrirEditar(turma)}>
                                            <Text style={styles.txtBotao}>Editar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.BotaoExcluir} onPress={() => confirmarExcluir(turma)}>
                                            <Text style={styles.txtBotao}>Excluir</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            ))}

                            {turmas.length === 0 && (
                                <Text style={{ color: '#fff', marginTop: 8, textAlign: 'center' }}>
                                    Nenhuma turma encontrada. Clique em "Cadastrar turma" para começar.
                                </Text>
                            )}
                        </>
                    )}
                </ScrollView>

                

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalEditarVisible}
                    onRequestClose={() => { setModalEditarVisible(false); setSelectedTurma(null); }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Editar Turma</Text>
                            <Text style={styles.label}>Nome da Turma</Text>
                            <TextInput style={styles.input} placeholder="Ex: 3ºA" value={editNome} onChangeText={setEditNome} />
                            <Text style={styles.label}>Quantidade</Text>
                            <TextInput style={styles.input} placeholder="Ex: 30" keyboardType='numeric' value={editQuantidade} onChangeText={setEditQuantidade} />
                            <Text style={styles.label}>Disciplina</Text>
                            <TextInput style={styles.input} placeholder="Ex: Matemática" value={editDisciplina} onChangeText={setEditDisciplina} />
                            <Text style={styles.label}>Tag</Text>
                            <TextInput style={styles.input} placeholder="Ex: gh6fs02j" value={editTag} onChangeText={setEditTag} />

                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={[styles.modalButton, styles.buttonCancel]} onPress={() => { setModalEditarVisible(false); setSelectedTurma(null); }}>
                                    <Text style={styles.textButtonCancel}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.modalButton, styles.buttonConfirm]} onPress={salvarEdicao} disabled={savingEdit}>
                                    <Text style={styles.textButtonConfirm}>{savingEdit ? 'Salvando...' : 'Salvar'}</Text>
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
    },
    disciplina: {
        color: '#666',
        fontSize: 12,
        marginTop: 2
    }
});

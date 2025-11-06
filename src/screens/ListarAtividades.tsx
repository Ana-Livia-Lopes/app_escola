import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationParameter } from "../features/navigation";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, Modal, TextInput } from 'react-native';
import Professor from '../features/professor';
import { supabase } from '../../supabase';

export default function ListarAtividades({ navigation, route }: NavigationParameter<"ListarAtividades">) {

    interface Item { id: string; titulo: string; descricao: string; entrega: string }

    const [atividades, setAtividades] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);

    const [modalEditarVisible, setModalEditarVisible] = useState(false);
    const [selectedAtividade, setSelectedAtividade] = useState<Item | null>(null);
    const [editTitulo, setEditTitulo] = useState('');
    const [editDescricao, setEditDescricao] = useState('');
    const [editEntrega, setEditEntrega] = useState('');
    const [savingEdit, setSavingEdit] = useState(false);

    const alertSair = () => Professor.sair().then(() => navigation.navigate("Autenticacao"));

    const abrirEditar = (item: Item) => {
        setSelectedAtividade(item);
        setEditTitulo(item.titulo);
        setEditDescricao(item.descricao);
        setEditEntrega(item.entrega);
        setModalEditarVisible(true);
    }

    const fetchAtividades = async (turmaId?: number) => {
        if (!turmaId) return;
        setLoading(true);
        try {
            const res = await supabase.from('atividades').select('*').eq('turma', turmaId);
            if (res.error) {
                console.log('Erro ao buscar atividades:', res.error);
                Alert.alert('Erro', res.error.message || 'Não foi possível buscar atividades');
            } else if (res.data) {
                const mapped = res.data.map((row: any) => ({
                    id: String(row.id),
                    titulo: row.titulo || row.nome || 'Sem título',
                    descricao: row.descricao || '',
                    entrega: row.entrega || row.dataEntrega || row.data_de_entrega || ''
                }));
                setAtividades(mapped);
            }
        } catch (e) {
            console.log('Erro inesperado ao buscar atividades:', e);
            Alert.alert('Erro', 'Erro inesperado ao buscar atividades');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const turmaId = (route?.params as any)?.turmaId;
            if (turmaId) fetchAtividades(turmaId);
        });

        // Carrega também na montagem inicial
        const turmaId = (route?.params as any)?.turmaId;
        if (turmaId) fetchAtividades(turmaId);

        // Limpa o listener quando o componente é desmontado
        return unsubscribe;
    }, [route?.params, navigation]);

    const salvarEdicao = async () => {
        if (!selectedAtividade) return;
        if (!editTitulo.trim() || !editDescricao.trim()) {
            Alert.alert('Erro', 'Título e descrição são obrigatórios');
            return;
        }
        setSavingEdit(true);
        try {
            const { error } = await supabase
                .from('atividades')
                .update({
                    titulo: editTitulo,
                    descricao: editDescricao,
                    data_de_entrega: editEntrega
                })
                .eq('id', selectedAtividade.id);

            if (error) throw error;

            setAtividades(prev => prev.map(a => a.id === selectedAtividade.id ? 
                { ...a, titulo: editTitulo, descricao: editDescricao, entrega: editEntrega } : a));
            Alert.alert('Sucesso', 'Atividade atualizada');
            setModalEditarVisible(false);
            setSelectedAtividade(null);
        } catch (e: any) {
            console.log('Erro ao editar atividade:', e);
            Alert.alert('Erro', e.message || 'Não foi possível editar a atividade');
        } finally {
            setSavingEdit(false);
        }
    }

    const excluir = (id: string) => {
        Alert.alert(
            'Atenção',
            'Deseja realmente excluir esta atividade?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Excluir', 
                    style: 'destructive', 
                    onPress: async () => {
                        try {
                            const { error } = await supabase
                                .from('atividades')
                                .delete()
                                .eq('id', id);

                            if (error) throw error;

                            setAtividades(prev => prev.filter(a => a.id !== id));
                            Alert.alert('Sucesso', 'Atividade excluída com sucesso');
                        } catch (e: any) {
                            console.log('Erro ao excluir atividade:', e);
                            Alert.alert('Erro', e.message || 'Não foi possível excluir a atividade');
                        }
                    }
                }
            ]
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#8b9fc0ff' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo} />
                    <View style={styles.headerRight}>
                        <Text style={styles.title}>Atividades{(route as any)?.params?.turmaNome ? ' | ' + (route as any).params.turmaNome : ''}</Text>
                        <Text style={styles.subtitle}>{(route as any)?.params?.turmaId ? `Turma ID: ${(route as any).params.turmaId}` : ''}</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.BotaoNovo}
                    onPress={() => navigation.navigate('CadastroAtividade', { turmaId: (route?.params as any)?.turmaId })}
                >
                    <Text style={styles.txtBotaoNovo}>Nova Atividade</Text>
                </TouchableOpacity>

                <ScrollView style={styles.listaContainer} contentContainerStyle={{ paddingBottom: 24 }}>

                    {loading ? (
                        <Text style={{ color: '#fff', marginTop: 8 }}>Carregando atividades...</Text>
                    ) : atividades.length === 0 ? (
                        <Text style={{ color: '#fff', marginTop: 8, textAlign: 'center' }}>Nenhuma atividade cadastrada para esta turma.</Text>
                    ) : (
                        atividades.map(item => (
                            <View key={item.id} style={styles.atividadeCard}>
                                <View style={styles.atividadeHeader}>
                                    <Text style={styles.atividadeTitulo}>{item.titulo}</Text>
                                </View>

                                <Text style={styles.atividadeDescricao}>{item.descricao}</Text>
                                
                                <View style={styles.atividadeFooter}>
                                    <Text style={styles.atividadeInfo}>
                                        <Text style={styles.infoLabel}>ID: </Text>
                                        {item.id}
                                    </Text>
                                    <Text style={styles.atividadeInfo}>
                                        <Text style={styles.infoLabel}>Entrega: </Text>
                                        {item.entrega}
                                    </Text>
                                </View>

                                <View style={styles.acoes}>
                                    <TouchableOpacity 
                                        style={styles.BotaoEditar}
                                        onPress={() => abrirEditar(item)}
                                    >
                                        <Text style={styles.txtBotao}>Editar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={styles.BotaoExcluir}
                                        onPress={() => excluir(item.id)}
                                    >
                                        <Text style={styles.txtBotao}>Excluir</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )}

                    <TouchableOpacity style={styles.BotaoSair} onPress={alertSair}>
                        <Text style={styles.txtBotaoSair}>Sair</Text>
                    </TouchableOpacity>

                </ScrollView>

                <Modal animationType="slide" transparent={true} visible={modalEditarVisible} onRequestClose={() => { setModalEditarVisible(false); setSelectedAtividade(null); }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Editar Atividade</Text>
                            <Text style={styles.label}>Título</Text>
                            <TextInput style={styles.input} value={editTitulo} onChangeText={setEditTitulo} />
                            <Text style={styles.label}>Descrição</Text>
                            <TextInput style={[styles.input, { height: 80 }]} multiline value={editDescricao} onChangeText={setEditDescricao} />
                            <Text style={styles.label}>Data de Entrega</Text>
                            <TextInput style={styles.input} value={editEntrega} onChangeText={setEditEntrega} />

                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={[styles.modalButton, styles.buttonCancel]} onPress={() => { setModalEditarVisible(false); setSelectedAtividade(null); }}>
                                    <Text style={styles.textButtonCancel}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.modalButton, styles.buttonConfirm]} onPress={salvarEdicao} disabled={savingEdit}>
                                    <Text style={styles.textButtonConfirm}>{savingEdit ? 'Salvando...' : 'Salvar'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

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
    // Modal styles
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
,
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
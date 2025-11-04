import { supabase } from "../../supabase";
import Atividade from "./atividade";
import Professor from "./professor";
import { Resultado, Status } from "./result";

export default class Turma {
    public id: number;
    public nome: string;
    public disciplina: string;
    public tag: string;
    public quantidadeAlunos: number;
    public professor: Professor;

    private constructor(id: number, nome: string, disciplina: string, tag: string, quantidadeAlunos: number, professor: Professor) {
        this.id = id;
        this.nome = nome;
        this.disciplina = disciplina;
        this.tag = tag;
        this.quantidadeAlunos = quantidadeAlunos;
        this.professor = professor;
    }

    public async editar(nome: string | undefined, disciplina: string | undefined, tag: string | undefined, quantidadeAlunos: number | undefined): Promise<Resultado<Turma>> {
        const camposParaAtualizar: any = {};
        
        if (nome !== undefined) {
            nome = nome.trim();
            if (!nome) {
                return {
                    status: Status.erro,
                    mensagem: "Nome não pode ser vazio",
                }
            }
            camposParaAtualizar.nome = nome;
        }
        
        if (disciplina !== undefined) {
            disciplina = disciplina.trim();
            if (!disciplina) {
                return {
                    status: Status.erro,
                    mensagem: "Disciplina não pode ser vazia",
                }
            }
            camposParaAtualizar.disciplina = disciplina;
        }
        
        if (tag !== undefined) {
            tag = tag.trim();
            if (!tag) {
                return {
                    status: Status.erro,
                    mensagem: "Tag não pode ser vazia",
                }
            }
            camposParaAtualizar.tag = tag;
        }
        
        if (quantidadeAlunos !== undefined) {
            if (quantidadeAlunos < 0) {
                return {
                    status: Status.erro,
                    mensagem: "A quantidade de alunos não pode ser negativa",
                }
            }
            camposParaAtualizar.quantidadeAlunos = quantidadeAlunos;
        }

        if (Object.keys(camposParaAtualizar).length === 0) {
            return {
                status: Status.erro,
                mensagem: "Nenhum campo foi fornecido para atualização",
            }
        }

        const result = await supabase
            .from("turmas")
            .update(camposParaAtualizar)
            .eq("id", this.id)
            .eq("professor", Professor.professor?.uid)
            .select();

        if (result.error) {
            return {
                status: Status.erro,
                mensagem: result.error.message,
            }
        }

        if (!result.data || result.data.length === 0) {
            return {
                status: Status.erro,
                mensagem: "Turma não encontrada ou você não tem permissão para editá-la",
            }
        }

        const row = result.data[0];

        // Atualiza os campos da instância atual
        this.nome = row.nome;
        this.disciplina = row.disciplina;
        this.tag = row.tag;
        this.quantidadeAlunos = row.quantidadeAlunos;

        return {
            status: Status.okay,
            resultado: this,
        }
    }

    public async excluir(): Promise<Resultado<boolean>> {
        const atividades = await Atividade.listar(this.id);

        if (atividades.status === Status.erro || atividades.resultado!.length == 0) {
            return {
                status: Status.erro,
                mensagem: "Não é possível excluir a turma pois existem atividades associadas a ela",
            }
        }
        
        const result = await supabase
            .from("turmas")
            .delete()
            .eq("id", this.id)
            .eq("professor", Professor.professor?.uid);

        if (result.error) {
            return {
                status: Status.erro,
                mensagem: result.error.message,
            }
        }

        // Verifica se algum registro foi afetado
        if (result.count === 0) {
            return {
                status: Status.erro,
                mensagem: "Turma não encontrada ou você não tem permissão para excluí-la",
            }
        }

        return {
            status: Status.okay,
            resultado: true,
        }
    }

    public static async listar(): Promise<Resultado<Turma[]>> {
        const result = await supabase.from("turmas").select().eq("professor", Professor.professor?.uid);
        if (result.error) {
            return {
                status: Status.erro,
                mensagem: result.error.message,
            }
        }
        const turmas: Turma[] = [];
        if (result.data) {
            for (const row of result.data) {
                turmas.push(new Turma(
                    row.id,
                    row.nome,
                    row.disciplina,
                    row.tag,
                    row.quantidadeAlunos,
                    Professor.professor!
                ));
            }
        }

        return {
            status: Status.okay,
            resultado: turmas,
        }
    }

    public static async criar(nome: string, disciplina: string, tag: string, quantidadeAlunos: number): Promise<Resultado<Turma>> {
        nome = nome.trim();
        disciplina = disciplina.trim();
        tag = tag.trim();
        
        const camposVazios = [];
        if (!nome) camposVazios.push("nome");
        if (!disciplina) camposVazios.push("disciplina");
        if (!tag) camposVazios.push("tag");

        if (camposVazios.length > 0) {
            return {
                status: Status.erro,
                mensagem: `Campos vazios: ${camposVazios.join(", ")}`,
            }
        }

        if (quantidadeAlunos < 0) {
            return {
                status: Status.erro,
                mensagem: "A quantidade de alunos não pode ser negativa",
            }
        }

        const result = await supabase.from("turmas").insert({
            nome: nome,
            disciplina: disciplina,
            tag: tag,
            quantidadeAlunos: quantidadeAlunos,
            professor: Professor.professor?.uid,
        }).select();

        if (result.error) {
            return {
                status: Status.erro,
                mensagem: result.error.message,
            }
        }

        if (!result.data || result.data.length === 0) {
            return {
                status: Status.erro,
                mensagem: "Nenhum registro retornado do banco de dados",
            }
        }

        const row = result.data[0];

        return {
            status: Status.okay,
            resultado: new Turma(
                row.id,
                row.nome,
                row.disciplina,
                row.tag,
                row.quantidadeAlunos,
                Professor.professor!,
            )
        }
    }
}
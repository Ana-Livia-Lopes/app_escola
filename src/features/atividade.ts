import Turma from "./turma";

export default class Atividade {
    public id: number;
    public titulo: string;
    public descricao: string;
    public turma: Turma;

    private constructor(id: number, titulo: string, descricao: string, turma: Turma) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.turma = turma;
    }

    public async editar(titulo: string | undefined, descricao: string | undefined) {}

    public async excluir() {}

    public static async listar(turmaId: number) {}

    public static async criar(turmaId: number, titulo: string, descricao: string) {}
}
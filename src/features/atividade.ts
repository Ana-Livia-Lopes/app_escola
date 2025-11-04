import { Resultado } from "./result";
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

    public async editar(titulo: string | undefined, descricao: string | undefined): Promise<Resultado<Atividade>> {
        throw Error();
    }

    public async excluir(): Promise<Resultado<void>> {
        throw Error();
    }

    public static async listar(turmaId: number): Promise<Resultado<Atividade[]>> {
        throw Error();
    }

    public static async criar(turmaId: number, titulo: string, descricao: string): Promise<Resultado<Atividade>> {
        throw Error();
    }
}
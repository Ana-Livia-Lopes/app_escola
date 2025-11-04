export enum Status {
    okay = "okay",
    erro = "erro",
}

export interface Resultado<T = undefined> {
    status: Status;
    mensagem?: string;
    resultado?: T
}
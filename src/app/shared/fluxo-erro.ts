import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Rotas } from "./enums/rotas-enum";

export type Erro = {
  titulo: string | undefined;
  mensagem: string | undefined;
  rotaBtnVoltar: string | undefined;
  codigo?: number | undefined;
}

@Injectable({ providedIn: "root" })
export class FluxoErro {

  construirErro(e: any, rotaBtnVoltar: string) {
    e = e || {};

    if (e.error) {

      let erroRetorno: Erro =
      {
        titulo: "Ops, Algo deu errado !",
        mensagem: `${e.error.message} - (Código ${e.error.status})`,
        rotaBtnVoltar: rotaBtnVoltar,
      };

      return erroRetorno;
    }

    let erroRetorno: Erro =
    {
      titulo: "Ops, Algo deu errado !",
      mensagem: "Não foi possível realizar a operação, tente novamente mais tarde.",
      rotaBtnVoltar: Rotas.HOME,
    };

    return erroRetorno;
  }
}


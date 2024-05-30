import { Injectable } from '@angular/core';
import { CARD_IMAGE, CARD_IMAGES } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }

  getImageCard(codStamp : string | null) : string {
    let urlImage = '';

    switch (codStamp) {
      case '700': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_SF; break;
      case '701': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_ORO; break;
      case '702': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_ACC; break;
      case '703': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_ACC; break;
      case '641': urlImage = CARD_IMAGE.URL + CARD_IMAGES.LIKEU_BLUE; break;
      case '642': urlImage = CARD_IMAGE.URL + CARD_IMAGES.LIKEU_RED; break;
      case '643': urlImage = CARD_IMAGE.URL + CARD_IMAGES.LIKEU_STAR; break;
      case '644': urlImage = CARD_IMAGE.URL + CARD_IMAGES.LIKEU_PINK; break;
      case '645': urlImage = CARD_IMAGE.URL + CARD_IMAGES.LIKEU_GREEN; break;
      case '646': urlImage = CARD_IMAGE.URL + CARD_IMAGES.LIKEU_WHITE; break;
      case '010': urlImage = CARD_IMAGE.URL + CARD_IMAGES.WORLD_RED_VECTOR; break;
      case '020': urlImage = CARD_IMAGE.URL + CARD_IMAGES.WORLD_RED_VECTOR; break;
      case '030': urlImage = CARD_IMAGE.URL + CARD_IMAGES.WORLD_RED_VECTOR; break;
      case '040': urlImage = CARD_IMAGE.URL + CARD_IMAGES.WORLD_RED_VECTOR; break;
      case '050': urlImage = CARD_IMAGE.URL + CARD_IMAGES.WORLD_RED_VECTOR; break;
      case '060': urlImage = CARD_IMAGE.URL + CARD_IMAGES.WORLD_RED_VECTOR; break;
      case '160': urlImage = CARD_IMAGE.URL + CARD_IMAGES.WORLD_RED_VECTOR; break;
      case '170': urlImage = CARD_IMAGE.URL + CARD_IMAGES.WORLD_RED_VECTOR; break;
      case '180': urlImage = CARD_IMAGE.URL + CARD_IMAGES.WORLD_RED_VECTOR; break;
      case '190': urlImage = CARD_IMAGE.URL + CARD_IMAGES.WORLD_RED_VECTOR; break;
      case '200': urlImage = CARD_IMAGE.URL + CARD_IMAGES.WORLD_RED_VECTOR; break;
      case '210': urlImage = CARD_IMAGE.URL + CARD_IMAGES.WORLD_RED_VECTOR; break;
      case '230': urlImage = CARD_IMAGE.URL + CARD_IMAGES.WORLD_RED_VECTOR; break;
      case '220': urlImage = CARD_IMAGE.URL + CARD_IMAGES.ZERO; break;
      case '130': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_FREE; break;
      case '110': urlImage = CARD_IMAGE.URL + CARD_IMAGES.ELITE_CLASICA_R; break;
      case '080': urlImage = CARD_IMAGE.URL + CARD_IMAGES.ORO; break;
      case '070': urlImage = CARD_IMAGE.URL + CARD_IMAGES.ORO; break;
      case '090': urlImage = CARD_IMAGE.URL + CARD_IMAGES.ORO_CASH; break;
      case '151': urlImage = CARD_IMAGE.URL + CARD_IMAGES.BLACK_U; break;
      case '152': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_IBERIA; break;
      case '153': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_ACCESS; break;
      case '145': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_ACCESS; break;
      case '100': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_EMP; break;
      case '901': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_EMP; break;
      case '550': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_EMP; break;
      case '902': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_EMP; break;
      case '560': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_EMP; break;
      case '903': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_EMP; break;
      case '225': urlImage = CARD_IMAGE.URL + CARD_IMAGES.AERO_BL; break;
      case '232': urlImage = CARD_IMAGE.URL + CARD_IMAGES.AERO_BL; break;
      case '226': urlImage = CARD_IMAGE.URL + CARD_IMAGES.AERO_PL; break;
      case '541': urlImage = CARD_IMAGE.URL + CARD_IMAGES.AERO_PL; break;
      case '227': urlImage = CARD_IMAGE.URL + CARD_IMAGES.AERO_INF; break;
      case '228': urlImage = CARD_IMAGE.URL + CARD_IMAGES.AERO_INF; break;
      case '222': urlImage = CARD_IMAGE.URL + CARD_IMAGES.INFINITE_U; break;
      case '223': urlImage = CARD_IMAGE.URL + CARD_IMAGES.INF_B_P; break;
      case '300': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_CLASICA; break;
      case '310': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_CLASICA; break;
      case '350': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_CLASICA; break;
      case '360': urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTDR_CLASICA; break;
      case '340': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_ELITE_CLASICA_R; break;
      case '240': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_ELITE_CLASICA_R; break;
      case '320': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_ELITE_ORO_R; break;
      case '321': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_ORO_F_R; break;
      case '531': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_INFOLESS_LIGHT; break;
      case '455': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_FIESTA_CLASICA_R; break;
      //case '390': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_ORO_SC; break;
      case '400': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_ORO_F_R; break;
      case '410': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_ORO_F_R; break;
      case '570': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_ORO_F_R; break;
      case '412': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_DELTA_ORO; break;
      case '600': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_EMP; break;
      case '610': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_EMP; break;
      case '620': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_EMP; break;
      case '904': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_EMP; break;
      case '905': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_EMP; break;
      case '450': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_PLATINO; break;
      case '450': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_PLATINO; break;
      case '330': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_ELITE_PLATINO_R; break;
      case '440': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_SNTDR_W_ELITE; break;
      case '442': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_SNTDR_W_E_PB; break;
      case '451': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_BLACK_U; break;
      case '452': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_FIESTA_PLATINO_R; break;
      case '533': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_FIESTA_PLATINO_R; break;
      case '453': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_BLACK_U; break;
      case '454': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_DELTA_PLATINO; break;
      case '420': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_SNTDR_FREE; break;
      case '421': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_SNTDR_FREE; break;
      case '534': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_SNTDR_FREE; break;
      case '545': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_SNTDR_FREE; break;
      case '430': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_SNTDR_FREE; break;
      case '460': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_FLEX; break;
      case '490': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_FLEX; break;
      case '470': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_BLACK; break;
      case '380': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_LIGHT_NOMINA; break;
      case '105': urlImage = CARD_IMAGE.URL + CARD_IMAGES.V_SUPER_AGRO; break;
      case '250': urlImage = CARD_IMAGE.URL + CARD_IMAGES.V_ORO_U; break;
      case '260': urlImage = CARD_IMAGE.URL + CARD_IMAGES.V_ORO_U; break;
      case '150': urlImage = CARD_IMAGE.URL + CARD_IMAGES.V_ORO_U; break;
      case '120': urlImage = CARD_IMAGE.URL + CARD_IMAGES.V_ORO_AMWAY; break;
      case '140': urlImage = CARD_IMAGE.URL + CARD_IMAGES.V_WORLD_RED; break;
      case '370': urlImage = CARD_IMAGE.URL + CARD_IMAGES.MC_CLASICA_L; break;
      default: urlImage = CARD_IMAGE.URL + CARD_IMAGES.SNTNDR_GENERICA; break;
    }

    return urlImage;
  }
}

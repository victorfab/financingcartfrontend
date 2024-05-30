import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { GoogleTagManagerService } from "angular-google-tag-manager";

@Component({
  selector: 'app-summary-switch',
  templateUrl: './summary-switch.component.html',
  styleUrls: ['./summary-switch.component.css']
})
export class SummarySwitchComponent implements OnInit {
  @Output() switchBtn : EventEmitter<any>;
  @Input() inputSwitchChild : boolean;
  status : string;

  constructor(private _gtm: GoogleTagManagerService) {
    this.switchBtn = new EventEmitter<any>();
    this.inputSwitchChild = true;
    this.status = '';
  }

  ngOnInit(): void {
    const rules = `@media (min-width: 360px) {
      .sn-slide-button .sn-slide-button-bar {
          width: 100% !important;
          background-color: #fff !important;
          height: 56px !important;
      }
      .sn-slide-button .sn-slide-button-bar:after {
          line-height: 3.4 !important;
          display: initial !important;
      }
      .sn-slide-button .slide-radius {
        top: 4px;
        left: 5px;
        box-shadow: none !important;
      }
    `;
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(rules));
    document.head.appendChild(style);
  }

  ngAfterViewInit() {
    this._gtm.pushTag({
      tipoSitio: 'Publico',
      idiomaPagina: 'Espanol',
      canalBanco: 'Supermovil',
      section: 'confirmar',
      titulo: 'confirmar',
      url: 'financing/disponibles-a-diferir/confirmar',
      buc_id: sessionStorage.getItem('buc'),
      plan: '',
      proceso: '',
      anio: '',
      tipoDispositivo: '',
      versionApp: '1.0.0',
      marca_dispositivo: '',
      sistema_operativo: '',
      entorno: '',
      event: 'pageView',
    });
  }

  confirmAndTag(switchBtn: any){
    switchBtn.emit()
    this._gtm.pushTag({
      event: 'interaccion',
      categoria: 'financing',
      accion: 'confirmar',
      etiqueta: 'desliza-para-confirmar',
      canalBanco: 'Supermovil',
      buc_id: sessionStorage.getItem('buc'),
    });
  }


}

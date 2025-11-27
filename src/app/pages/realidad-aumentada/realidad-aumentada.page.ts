import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ArConfigService } from '../../services/RA-config.service';

@Component({
  selector: 'app-realidad-aumentada',
  templateUrl: './realidad-aumentada.page.html',
  styleUrls: ['./realidad-aumentada.page.scss'],
  standalone: false
})
export class RealidadAumentadaPage implements OnInit {

  arSceneUrl: SafeResourceUrl | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private arConfig: ArConfigService,
    private router: Router
  ) {}

  ngOnInit() {
    const target = this.arConfig.getCurrentTarget();

    if (!target) {
      this.router.navigate(['/home']);
      return;
    }

    // Devuelve: marker-carro, marker-robot, etc.
    const markerId = this.arConfig.getMarkerIdFor(target);

    // Archivo que contiene todos los marcadores dinámicos
    const url = `assets/utiles/marker-scene.html?marker=${markerId}`;

    this.arSceneUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    console.log("Cargando escena AR con marker:", markerId);
  }
}

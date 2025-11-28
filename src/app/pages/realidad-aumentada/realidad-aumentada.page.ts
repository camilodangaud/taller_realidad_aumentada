import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ArConfigService } from '../../services/RA-config.service';

declare var AFRAME: any;

@Component({
  selector: 'app-realidad-aumentada',
  templateUrl: './realidad-aumentada.page.html',
  styleUrls: ['./realidad-aumentada.page.scss'],
  standalone: false
})
export class RealidadAumentadaPage implements OnInit, OnDestroy {

  constructor(
    private arConfig: ArConfigService,
    private router: Router
  ) {}

  ngOnInit() {
    const targetId = this.arConfig.getCurrentTarget();

    if (!targetId) {
      this.router.navigate(['/home']);
      return;
    }

    const markerId = this.arConfig.getMarkerIdFor(targetId);
    console.log('🎯 Loading AR for:', markerId);

    this.loadARScene(markerId);
  }

  loadARScene(markerId: string) {
    // Cargar A-Frame
    this.loadScript('https://aframe.io/releases/1.6.0/aframe.min.js')
      .then(() => {
        console.log('✅ A-Frame loaded');
        return this.loadScript('https://raw.githack.com/AR-js-org/AR.js/3.4.7/aframe/build/aframe-ar.js');
      })
      .then(() => {
        console.log('✅ AR.js loaded');
        setTimeout(() => {
          this.createScene(markerId);
        }, 500);
      })
      .catch(err => {
        console.error('❌ Error loading scripts:', err);
      });
  }

  loadScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${url}"]`);
      if (existing) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed: ${url}`));
      document.head.appendChild(script);
    });
  }

  createScene(markerId: string) {
    const container = document.getElementById('ar-container');
    if (!container) return;

    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', '');
    scene.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false;');
    scene.setAttribute('vr-mode-ui', 'enabled: false');

    const marker = document.createElement('a-marker');
    marker.setAttribute('preset', 'hiro');

    const box = document.createElement('a-box');
    box.setAttribute('position', '0 0.5 0');
    box.setAttribute('material', 'color: #FF0000;');
    box.setAttribute('rotation', '0 45 0');
    box.setAttribute('animation', 'property: rotation; to: 0 405 0; loop: true; dur: 10000;');

    marker.appendChild(box);

    const camera = document.createElement('a-entity');
    camera.setAttribute('camera', '');

    scene.appendChild(marker);
    scene.appendChild(camera);
    container.appendChild(scene);

    console.log('✅ Scene created');
  }

  ngOnDestroy() {
    const container = document.getElementById('ar-container');
    if (container) {
      container.innerHTML = '';
    }
  }
}
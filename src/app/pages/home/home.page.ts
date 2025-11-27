import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArConfigService, MarkerEntry } from '../../services/RA-config.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  markers: MarkerEntry[] = [];
  selectedMarkerId: string | null = null;
  loadingMarkers = true;

  constructor(
    private router: Router,
    private arConfig: ArConfigService
  ) {}

  async ngOnInit() {
    this.loadingMarkers = true;
    this.markers = await this.arConfig.loadManifest();
    if (this.markers.length) this.selectedMarkerId = this.markers[0].id;
    this.loadingMarkers = false;
  }

  openAR() {
    if (this.selectedMarkerId) {
      this.arConfig.setCurrentTarget(this.selectedMarkerId);
      this.router.navigate(['/realidad-aumentada']);
    }
  }

  getSelectedMarkerImg(): string | null {
    const m = this.markers.find(x => x.id === this.selectedMarkerId);
    return m ? m.image : null;
  }
}

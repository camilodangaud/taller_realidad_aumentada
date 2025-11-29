import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface MarkerEntry {
  id: string;
  label: string;
  pattern: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArConfigService {

  private manifestPath = 'assets/utiles/manifest.json';
  private markers: MarkerEntry[] = [];

  constructor(private http: HttpClient) {}

  async loadManifest(): Promise<MarkerEntry[]> {
    if (this.markers.length) return this.markers;

    try {
      const res: any = await this.http.get(this.manifestPath).toPromise();
      this.markers = res?.markers || [];
      return this.markers;
    } catch (err) {
      console.error('Error loading AR manifest', err);
      this.markers = [];
      return this.markers;
    }
  }

  getMarkers(): MarkerEntry[] {
    return this.markers;
  }

  private currentTarget: string | null = null;

  setCurrentTarget(target: string) { 
    this.currentTarget = target; 
  }

  getCurrentTarget() { 
    return this.currentTarget; 
  }

  getMarkerById(id: string): MarkerEntry | undefined {
    return this.markers.find(m => m.id === id);
  }
}

import { Component, OnInit, Type } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor( private countryService: CountryService) { }

  ngOnInit(): void {
    this.selectedRegion = this.countryService.cacheStore.byRegion.region;
    this.countries = this.countryService.cacheStore.byRegion.countries;
  }

  searchByRegion( region: Region ) {
    this.isLoading = true;
    this.selectedRegion = region as Region;
    this.countryService.searchByRegion( region )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public initialValue: string = '';

  @Input()
  public countries: Country[] = [];

  public isLoading: boolean = false;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.initialValue = this.countryService.cacheStore.byCountry.term;
    this.countries = this.countryService.cacheStore.byCountry.countries;
  }

  search( term: string ) {
    this.isLoading = true;
    this.countryService.searchByCountryName(term)
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

}

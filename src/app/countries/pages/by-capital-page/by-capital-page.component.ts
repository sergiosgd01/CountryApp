import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.initialValue = this.countryService.cacheStore.byCapital.term;
    this.countries = this.countryService.cacheStore.byCapital.countries;
  }

  searchByCapital (capital: string): void  {

    this.isLoading = true;

    this.countryService.searchByCapital(capital)
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

}

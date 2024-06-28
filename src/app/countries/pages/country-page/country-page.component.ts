import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html'
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap( ({ id }) => this.countryService.searchCountryByAlphaCode(id) ),
    )
    .subscribe( country => { console.log({country})
      if (!country) {
        this.router.navigateByUrl('');
        return;
      }
      else {
        console.log('Tenemos un pais');
        return this.country = country;
      }



    });
  }
}

export class City {

  public name: string = null;
  public secondName: string = null;
  public code: number = null;
  public codeCountry: number = null;

  constructor(name: string, codeCity: number, codeCountry: number, secondName: string = null) {
    this.name = name;
    this.secondName = secondName;
    this.code = codeCity;
    this.codeCountry = codeCountry;
  }
}

export class Country {

  public name: string = null;
  public secondName: string = null;
  public code: number = null;

  constructor(name: string, code: number, secondName: string = null) {
    this.name = name;
    this.secondName = secondName;
    this.code = code;
  }
}

export class Locations {

  public legacyCity: City = new City('Данные устарели', -1, -1);
  public listCity: City[] = [];
  public listCountry: Country[] = [];

  constructor(jsonList, lang: string) {
    jsonList.forEach((country) => {
        this.listCountry.push(new Country(country.countryName[lang], country.codeCountry, country.countryName[lang === 'en' ? 'ru' : 'en']));
        country.cities.forEach((city) => this.listCity.push(new City(city.cityName[lang], city.codeCity, country.codeCountry, city.cityName[lang === 'en' ? 'ru' : 'en'])));
      },
    );
  }

  public getCityToCode(code: any): City {
    if (typeof code === 'number') {
      return this.listCity.find(city => city.code === code);
    } else {
      return this.legacyCity;
    }
  }

}

export class City {

    public name: string = null;
    public code: number = null;
    public codeCountry: number = null;

    constructor(name: string, codeCity: number, codeCountry: number) {
        this.name = name;
        this.code = codeCity;
        this.codeCountry = codeCountry;
    }
}

export class Country {

    public name: string = null;
    public code: number = null;

    constructor(name: string, code: number) {
        this.name = name;
        this.code = code;
    }
}

export class Locations {

    public gavnoCity: City = new City('Данные устарели', -1, -1);
    public listCity: City[] = [];
    public listCountry: Country[] = [];

    constructor(jsonList, lang: string) {
        jsonList.forEach( (country) => {
                this.listCountry.push(new Country(country.countryName[lang], country.codeCountry));
                country.cities.forEach((city) => this.listCity.push(new City(city.cityName[lang], city.codeCity, country.codeCountry)));
            }
        );
    }

    public getCityToCode(code: any): City {
        if (typeof code === "number") {
            return this.listCity.find(city => city.code === code);
        } else {
            return this.gavnoCity;
        }
    }

}

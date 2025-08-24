# Koledar

## Format praznikov (holidays.txt)
Datoteka holidays.txt se mora nahajati v korenskem direktoriju projekta.
Če datoteka ni prisotna, se praznikov ne prikaže.

Format datoteke je naslednji:

```
yyyy-mm-dd [y|m|d|n]
yyyy-mm-dd [y|m|d|n]
yyyy-mm-dd [y|m|d|n]
```

Prvi del predstavlja datum, drugi del pove kako se datum ponavlja (v prihodnost in preteklost):

```
y - datum se ponavlja vsako leto
m - datum se ponavlja vsak mesec
d - datum se ponavlja vsak dan
n - datum se ne ponavlja
```

Primeri:
| format        | opis datuma                              | primeri datumov (dd. mm. yyyy)  |
|---------------|------------------------------------------|---------------------------------|
|`2025-12-24 y` | vsako leto 24. decembra                  | `24. 12. 2029`, `24. 12. 1509`
|`2000-12-01 m` | vsak prvi dan v mesecu                   | `1. 10. 2025`, `1. 5. 1182`
|`2000-05-01 d` | vsi dnevi v mesecu maju leta 2000        | `5. 5. 2000`, `30. 5. 2000`

## Organizacija kode
- [`src/lib/date.ts`](`src/lib/date.ts`) vsebuje pomožne funkcije in razred Date
- [`src/routes/+page.server.ts`](`src/routes/+page.server.ts`) prebere datoteko holidays.txt in jo pošlje [`src/routes/+page.svelte`](`src/routes/+page.svelte`), ki je odgovorna za prikaz koledarja

## Poganjanje projekta
Spodaj so predstavljeni trije načini za poganjanje aplikacije, razvrščeni so po zahtevnosti.
Pred zaganjanjem je potrebno klonirati repozitorij:
```bash
git clone git@github.com:gbucar/koledar.git
cd koledar
```

### Docker Compose
Najlažje se aplikacijo požene z Docker Compose:
1. `docker compose up`
2. odpri [http://localhost:3000](http://localhost:3000)

### Docker
Če Docker Compose ni na voljo, se ročno zgradi Docker sliko in jo požene:
1. grajenje: `docker build -t koledar .`
2. poganjanje: `docker run -p 3000:3000 -v ./holidays.txt:/app/holidays.txt koledar`
3. odpri [http://localhost:3000](http://localhost:3000)

### Node
Zadnja opcija je poganjanje v node okolju, za to je priporočen nodejs22:
1. naloži odvisnosti: `npm install`
2. zgradi aplikacijo: `npm run build`
3. poženi zgrajeno aplikacijo: `node build`
4. odpri [http://localhost:3000](http://localhost:3000)

## Poganjanje za razvijanje
1. naloži odvisnosti: `npm install`
2. poženi aplikacijo za razvijanje: `npm run dev -- --open`
3. če se ne odpre samodejno, odpri [http://localhost:5173](http://localhost:5173)

## Licence
[Favicon](https://www.svgrepo.com/svg/533385/calendar-check), [MonthArrows](https://www.svgrepo.com/svg/520523/arrow-left-5): [CC Attribution License](https://www.creativecommons.org/licenses/by-nc/4.0/deed.en)

## Uporaba umetne inteligence
Izjavljam, da pri programiranju te aplikacije nisem uporabil umetne inteligence, razen enkrat za preverjanje te README datoteke.

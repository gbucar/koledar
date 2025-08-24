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





##

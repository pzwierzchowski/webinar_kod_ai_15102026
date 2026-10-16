# Testy E2E TAPSS Test Shop

Scenariusze Cypress sprawdzają dodanie Polo do koszyka, zawartość koszyka, checkout, walidację danych i potwierdzenie złożenia zamówienia.

## Uruchomienie

```bash
npm install
npm run cypress:open
```

Uruchomienie bez interfejsu:

```bash
npm run cypress:run
```

Domyślny adres to `https://tapsshop.pl`. Można go zmienić zmienną `CYPRESS_BASE_URL`.

**Uwaga:** pełny scenariusz klika „Kupuję i płacę” i tworzy zamówienie na stronie. Obecnie sklep oferuje przelew bankowy, więc nie wykonuje płatności kartą, ale każde uruchomienie pełnego scenariusza może utworzyć kolejne zamówienie testowe. Uruchamiaj go wyłącznie na środowisku testowym.
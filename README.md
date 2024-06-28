## Overview Instructions

- Page router used
- Try to use Chakra UI
- State manage? useState hook
- version control

## M1

### Backend:

APIs

- data structure: testing in postman
  data I need: {rank, code, price, change, marketCap}
- pass multiple query params using axios
- params I need from api: {start - pagniation, limit - fetching first 25, sort, sort_dir}

### frontend

- loading page
- mock max
- card to show each record, 4 boxes in a card, 5 attributes need to be rendered: {rank, code, price, change, marketCap}
- numbers need formatting, handle large numbers, Price column need aligned to right, bold/light font, Arrows symbol
- images may be retrieved on server
- SearchIcon, CloseIcon from chakra maybe useful for building search bar
- Give a larger static size for the arrow container

## M2

Sorting Logics

- State: {sortField, sortDirection} state changes will trigger api calls, re-sort list by selected value, also change the arrow direction accordingly.
- Input delay: setTimeout in a useEffect hook, triggers after 2s user stop typing.
- useCallback is used for data memorization, serves sorting feature

Search Logics

- useState hook for monitoring search input values

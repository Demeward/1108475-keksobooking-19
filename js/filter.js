import { markerGroup } from './map.js';


const ANY = 'any';

const PricePool = {
  'low': {
    min: 0,
    max: 10000
  },
  'high': {
    min: 50000,
    max: 100000
  },
  'middle': {
    min: 10000,
    max: 50000
  },
  'any': {
    min: 0,
    max: 100000
  },
};

const mapFilters = document.querySelector('.map__filters');
const accommodationFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
// const featuresFilter = mapFilters.querySelectorAll('#housing-features input');

const filterByAccommodation = ({offer}) => {
  if (accommodationFilter.value === ANY) {
    return offer;
  }
  if (offer.type === accommodationFilter.value) {
    return offer;
  }
};

const filterByRooms = ({offer}) => (roomsFilter.value === ANY) ? offer : offer.rooms === +roomsFilter.value;

const filterByGuests = ({offer}) => (guestsFilter.value === ANY) ? offer : offer.guests === +guestsFilter.value;

const filterByPrice = ({offer}) => offer.price >= PricePool[priceFilter.value].min && offer.price <= PricePool[priceFilter.value].max;

const filterByFeatures = ({offer}) => {
  const filteredFeatures = [];
  const checkedFeatures = document.querySelector('.map__features').querySelectorAll('input:checked');
  checkedFeatures.forEach((element) => filteredFeatures.push(element.value));
  if (offer.features){
    return filteredFeatures.every((feature) => offer.features.includes(feature));
  }
  return false;
};

const filterOffers = (offers) => offers.filter((offer) => (filterByAccommodation(offer) &&
  filterByPrice(offer) &&
  filterByRooms(offer) &&
  filterByGuests(offer) &&
  filterByFeatures(offer)));

const setMapFilters = (callback) => {
  mapFilters.addEventListener('change', () => {
    markerGroup.clearLayers();
    callback();
  });
};

export { setMapFilters, filterOffers, mapFilters };

import { MenuItem } from '@components/dropdown-menu';

const MOVIE_STATUS_FILTER_OPTIONS: MenuItem[] = [
  { name: 'Now Playing', value: 'now_playing' },
  { name: 'Upcoming', value: 'upcoming' },
  { name: 'Popular', value: 'popular' },
] as const;

const MOVIE_SORTING_OPTIONS: MenuItem[] = [
  { name: 'By alphabetical order', value: 'title.asc' },
  { name: 'By rating', value: 'vote_average.desc' },
  { name: 'By release date', value: 'primary_release_date.desc' },
] as const;

export { MOVIE_STATUS_FILTER_OPTIONS, MOVIE_SORTING_OPTIONS };

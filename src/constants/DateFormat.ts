export const EXTENDED_TITLE_FORMAT = new Intl.DateTimeFormat('en-US', {
	month: 'short',
	weekday: 'short',
  day: 'numeric',
  year: 'numeric'
});

export const FORMAT = new Intl.DateTimeFormat('en-US', {
	month: 'long',
	weekday: 'long',
  day: 'numeric',
  year: 'numeric'
});

export const PRESET_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  weekday: 'short',
  year: 'numeric'
})

export const TITLE_FORMAT = new Intl.DateTimeFormat('en-US', {
	month: 'short',
	weekday: 'short',
	day: 'numeric',
});
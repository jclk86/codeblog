import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// index will correspond with state's 0 or 1 value. 
const LIST_VIEW_ICONS = ['list', 'border-all'];
const DATE_FILTERING_ICONS = ['sort-numeric-down', 'sort-numeric-up'];
// pass a callback and state 
function FilteringMenu({ onChange, filter }) {
  return (
    <div className="filtering-menu mb-2">
      <FontAwesomeIcon
        className="clickable hoverable mr-3"
        size="2x"
        icon={LIST_VIEW_ICONS[filter.view.list]} 
        onClick={() => 
        // view is option. The parameter option is set inthe callback in index.js. 
        // And value is { list: 0 or 1 } - also passed down from index.js
        // corresponds with state's structure in index.js. Ex: view: { list : 1 }
        onChange('view', { list: +!filter.view.list })} />
      <FontAwesomeIcon
        className="clickable hoverable"
        size="2x"
        icon={DATE_FILTERING_ICONS[filter.date.asc]} 
        onClick={() => 
        // view is option. The parameter option is set inthe callback in index.js. 
        // And value is { list: 0 or 1 } - also passed down from index.js
        // corresponds with state's structure in index.js. Ex: view: { list : 1 }
        onChange('date', { asc: +!filter.date.asc })} />
    </div>
  )
}

export default FilteringMenu;
// +!filter turns value into integer, either 1 or 0, depending on what filter was equal to. 
  // if filter comes in = 0, then +!filter = 1. If 1, then +!filter = 0.
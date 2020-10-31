import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// index will correspond with state's 0 or 1 value. 
const LIST_VIEW_ICONS = ['list', 'border-all'];

function FilteringMenu({ onChange, filter }) {
  return (
    <div className="filtering-menu mb-2">
      <FontAwesomeIcon
        className="clickable hoverable"
        size="2x"
        icon={LIST_VIEW_ICONS[filter.view.list]} 
        onClick={() => 
        // view is option, which is passed in index.js, and value is { list: 0 or 1 } - also passed down from index.js
        onChange('view', { list: +!filter.view.list })} />
    </div>
  )
}

export default FilteringMenu;
// +!filter turns value into integer, either 1 or 0, depending on what filter was equal to. 
  // if filter comes in = 0, then +!filter = 1. If 1, then +!filter = 0.
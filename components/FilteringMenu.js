


function FilteringMenu({ onChange, filter }) {
  return (
    <div className="filtering-menu mb-2">
      <div onClick={() => 
        // view is option, which is passed in index.js, and value is { list: 0 or 1 } - also passed down from index.js
        onChange('view', { list: +!filter.view.list })}>
        Change View
      </div>
    </div>
  )
}

export default FilteringMenu;
// +!filter turns value into integer, either 1 or 0, depending on what filter was equal to. 
  // if filter comes in = 0, then +!filter = 1. If 1, then +!filter = 0.
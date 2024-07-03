import React from 'react';
function Filter({filter, edit}) {
  return (
    <div className="filter">
        <p>Filter: {filter.name}</p>
        <div>
          <button onClick={() => { edit(filter, false)}}>Edit filter</button>
          <button onClick={() => { edit(filter, true)}}>Edit filter in modal</button>
        </div>
    </div>
  );
}

export default Filter;

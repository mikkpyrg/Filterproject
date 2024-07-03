import './App.css';
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import Filter from './components/Filter';
import FilterEdit from './components/FilterEdit';

function App() {
  const [filters, setFilters] = useState([]);
  const [filterEdit, setFilterEdit] = useState(null);
  const [openInModal, setOpenInModal] = useState(false);

  const addNewFilter = (inModal) => {
    edit({name: '', id: 0, criteria: []}, inModal)
  };

  const edit = (filter, inModal) => {
    setOpenInModal(inModal);
    setFilterEdit(filter);
  }

  const onSave = (updatedFilter, isUpdate) => {

    fetch(process.env.REACT_APP_API_URI + '/addUpdateFilter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedFilter)
    })
    .then(response => response.json())
    .then(data => {
      if (isUpdate) {
        setFilters(filters.map((x) => x.id === data.id ? data : x));
      } else {
        setFilters([...filters, data]);
      }
    })
    
    onCancel();
  };

  const onCancel = () => {
    setFilterEdit(null);
    setOpenInModal(false);
  };

  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URI + '/getAllFilters')
    .then(response => response.json())
    .then(data => {
      setFilters(data);
    })
  }, [])
  
  return (
    <div className="App">
      {filterEdit && !openInModal && <FilterEdit filter={filterEdit} onSave={onSave} onCancel={onCancel} />}
      {(openInModal || !filterEdit) && 
        <div className="w-500">
          {filters.map(filter => 
            <Filter key={filter.id} filter={filter} edit={edit} />
          )}
          <div>
            <button onClick={() => {addNewFilter(false)}}>Create new filter</button>
            <button onClick={() => {addNewFilter(true)}}>Create new filter in modal</button>
          </div>
        </div>
      }
      
      <ReactModal ariaHideApp={false} 
        onRequestClose={() => {onCancel()}} 
        isOpen={openInModal && !!filterEdit} 
        style={{content:{'width': '540px', left: '50%', transform: 'translate(-50%)', height: '300px'}}}>
        <FilterEdit filter={filterEdit} onSave={onSave} onCancel={onCancel} />
      </ReactModal>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import CriteriaRowEdit from './CriteriaRowEdit';
import CriteriaType from '../const/CriteriaType';

function FilterEdit({filter, onSave, onCancel}) {
  const [name, setName] = useState(filter?.name);
  const [criteria, setCriteria] = useState(filter?.criteria ?? []);
  const [validationMessage, setValidationMessage] = useState('');

  const addCriteria = () => {
    setCriteria([...criteria, {id: 0, type: 'Amount', subType: 'Equals', amount: 0, title: '', date: ''}])
  };

  const onDelete = (index) => {
    setCriteria(criteria.toSpliced(index,1));
  }

  const onEdit = (index, id, type, subType, amount, title, date) => {
    setCriteria(criteria.map((x, i) => i === index ? {id, type, subType, amount, title, date} : x));
  }

  const validateAndSave = () => {
    setValidationMessage('');
    if (!name?.length) {
      setValidationMessage('Name is empty');
      return;
    }

    if (!criteria?.length) {
      setValidationMessage('At least 1 criteria required');
      return;
    }

    var erronousCriteria = criteria.filter((x) => (x.type === CriteriaType.Title && !x.title?.length) 
      || (x.type === CriteriaType.Date && !x.date?.length))

    if (erronousCriteria.length) {
      setValidationMessage('At least 1 criteria doesn\'t have a value');
      return;
    }
    onSave({...filter, name, criteria}, filter.id !== 0);
  }

  return (
    <div className="w-500">
      <div className="error">{validationMessage}</div>
      <div className="col">
        <div className="col-left">
          <div className="m-d-10">Name</div>
          <div>Criteria</div>
        </div>
        <div>
            <input type="text" className="m-d-10" value={name} onChange={(e) => setName(e.target.value)} placeholder='filter name' />
            {criteria.map((x, i) => <CriteriaRowEdit key={i} index={i} criterion={x} onEdit={onEdit} onDelete={onDelete}/>)}
            <div>
              <button onClick={() => addCriteria(filter)}>Add row</button>
            </div>
        </div>
      </div>
        <button onClick={() => validateAndSave()}>Save</button>
        <button className="dark" onClick={() => onCancel(filter)}>Close</button>
    </div>
  );
}

export default FilterEdit;

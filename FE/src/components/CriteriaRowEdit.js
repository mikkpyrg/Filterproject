import React from 'react';
import CriteriaType from '../const/CriteriaType';
import {CriteriaTypeToSubType} from '../const/CriteriaSubType';

function CriteriaRowEdit({index, criterion, onEdit, onDelete}) {
  const changeType = (changeHandler) => {
    onEdit(index, criterion.id, changeHandler.target.value, Object.values(CriteriaTypeToSubType[changeHandler.target.value])[0], criterion.amount, criterion.title, criterion.date);
  }

  const changeSubType = (changeHandler) => {
    onEdit(index, criterion.id, criterion.type, changeHandler.target.value, criterion.amount, criterion.title, criterion.date);
  }

  const setAmount = (amount) => {
    onEdit(index, criterion.id, criterion.type, criterion.subType, parseInt(amount), criterion.title, criterion.date);
  }

  const setTitle = (title) => {
    onEdit(index, criterion.id, criterion.type, criterion.subType, criterion.amount, title, criterion.date);
  }

  const setDate = (date) => {
    onEdit(index, criterion.id, criterion.type, criterion.subType, criterion.amount, criterion.title, date ? new Date(date).toISOString() : '');
  }

  const parsedDate = criterion?.date ? (criterion.date.split('T')[0]) : '';
  
  return (
    <div className="m-d-10">
      <select onChange={changeType} value={criterion.type}>
        {Object.keys(CriteriaType).map((key) => <option key={key} value={CriteriaType[key]}>{key}</option>)}
      </select>
      <select onChange={changeSubType} value={criterion.subType}>
        {Object.keys(CriteriaTypeToSubType[criterion.type]).map((key) => <option key={key} value={CriteriaTypeToSubType[criterion.type][key]}>{key}</option>)}
      </select>
      {criterion.type === CriteriaType.Amount && <input type="number" value={criterion.amount} onChange={(e) => setAmount(e.target.value)} placeholder='amount' />}
      {criterion.type === CriteriaType.Title && <input type="text" value={criterion.title} onChange={(e) => setTitle(e.target.value)} placeholder='title' />}
      {criterion.type === CriteriaType.Date && <input type="date" value={parsedDate} onChange={(e) => setDate(e.target.value)} placeholder='date' />}
      <button className="dark" onClick={() => onDelete(index)}>Delete</button>
    </div>
  );
}

export default CriteriaRowEdit;

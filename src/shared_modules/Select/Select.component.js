import React from 'react';
import './Select.component.scss'
import Select from 'react-select';


const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: 200
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 200,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = data => (
  <div className='formatGroupLabel' style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);



/**
 * @param {Object} properties
 * @param {Array.<{value:String, label:String}>} properties.options
 * @param {Function} properties.handleEvent
 */
 const SelectComponent = (properties) => (
  <Select
    className={'SelectComponent'}
    options={properties.options}
    formatGroupLabel={formatGroupLabel}
    onChange={properties.handleEvent}
  />
);

export default SelectComponent
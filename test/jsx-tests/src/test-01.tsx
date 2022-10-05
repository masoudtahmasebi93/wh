/**
 * In the following React template, display an unordered list (UL) with list items (LI) within it. 
 * The content of each list item should contain two spans (SPAN), one with the name and the other with the age passed in to the DataList function. 
 * The span elements should be separated by a single space.
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function DataList(props) {
  return (
      <ul>
        {props.data && props.data.map((item)=>
            <DataListItem key={`${item.name}${item.age}`} item={item} />
        )}
      </ul>
  );
}

function DataListItem(props){
  return (
      <li>
        <span className={"name"}>{props.item.name}</span>&nbsp;<span className={"age"}>{props.item.age}</span>
      </li>
  )
}

const data = [
  { name: 'Daniel', age: 25 },
  { name: 'John', age: 24 },
  { name: 'Jen', age: 31 },
];

ReactDOM.render(
    <DataList data={ data } />,
    document.getElementById('test-01')
);
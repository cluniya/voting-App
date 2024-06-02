import React from 'react';

const Option = ({ option, removeVote }) => {
  return (
    <div>
      <h3>{option.name}</h3>
      <p>Total Votes: {option.votes ? option.votes.length : 0}</p>
      <ul>
        {option.votes && option.votes.map((voter, index) => (
          <li key={index}>
            <h4>{voter}</h4>
            <button style={{background:'red',borderRadius:'6px'}} onClick={() => removeVote(option.name, voter)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Option;

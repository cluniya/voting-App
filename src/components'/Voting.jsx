import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Option from './Option';
import VoteModal from './modals/VoteModal';

const Voting = () => {
  const [options, setOptions] = useState([
    { name: 'Candidate 1', votes: [] },
    { name: 'Candidate 2', votes: [] },
    { name: 'Candidate 3', votes: [] },
  ]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await fetch('https://voting-system-60638-default-rtdb.firebaseio.com/options.json');
      if (!response.ok) {
        throw new Error('Failed to fetch options');
      }
      const data = await response.json();
      if (data) {
        setOptions(data);
      }
      else{
        
      }
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const updateOptionsInDatabase = async (updatedOptions) => {
    try {
      await fetch('https://voting-system-60638-default-rtdb.firebaseio.com/options.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOptions),
      });
    } catch (error) {
      console.error('Error updating options:', error);
    }
  };

  const vote = async (candidateName, voterName) => {
    const updatedOptions = options.map(option =>
      option.name === candidateName ? { ...option, votes: [...option.votes, voterName] } : option
    );
    setOptions(updatedOptions);
    await updateOptionsInDatabase(updatedOptions);
  };

  const removeVote = async (candidateName, voterName) => {
    const updatedOptions = options.map(option =>
      option.name === candidateName ? { ...option, votes: option.votes.filter(voter => voter !== voterName) } : option
    );
    setOptions(updatedOptions);
    await updateOptionsInDatabase(updatedOptions);
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const totalVotes = options.reduce((acc, option) => {
    return acc + (option.votes ? option.votes.length : 0);
  }, 0);
  return (
    <Container className="text-center mt-5">
      <h1>Class Monitor Voting</h1>
      <Button variant="primary" onClick={handleShow} className="my-4">
        Add New Vote
      </Button>
      <h4>Total Votes: {totalVotes}</h4>
      <Row>
        {options.map(option => (
          <Col key={option.name}>
            <Option
              option={option}
              removeVote={removeVote}
            />
          </Col>
        ))}
      </Row>
      <VoteModal
        show={showModal}
        handleClose={handleClose}
        candidates={options}
        castVote={vote}
      />
    </Container>
  );
};

export default Voting;

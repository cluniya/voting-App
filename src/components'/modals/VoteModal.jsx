import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const VoteModal = ({ show, handleClose, candidates, castVote }) => {
  const [voterName, setVoterName] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');

  const handleVote = (e) => {
    e.preventDefault();
    if (voterName && selectedCandidate) {
      castVote(selectedCandidate, voterName);
      handleClose();
      setVoterName('');
      setSelectedCandidate('');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cast Your Vote</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleVote}>
          <Form.Group>
            <Form.Label>Voter Name</Form.Label>
            <Form.Control
              type="text"
              value={voterName}
              onChange={(e) => setVoterName(e.target.value)}
              placeholder="Enter your name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Select Candidate</Form.Label>
            <Form.Control
              as="select"
              value={selectedCandidate}
              onChange={(e) => setSelectedCandidate(e.target.value)}
            >
              <option value="">Select a candidate</option>
              {candidates.map((candidate, index) => (
                <option key={index} value={candidate.name}>{candidate.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button type='submit' variant="primary" className="mt-3">
            Vote
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default VoteModal;

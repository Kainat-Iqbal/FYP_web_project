import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function Dialogue({ show, handleClose, handleSend }) {
    const [reason, setReason] = useState("");

    const handleReasonChange = (e) => {
      setReason(e.target.value);
    };
  
    const onSend = () => {
      if (reason.trim()) {
        handleSend(reason);
      } else {
        alert("Please provide a reason for disapproval.");
      }
    };
  
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Disapprove Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="disapproveReason">
              <Form.Label>Reason for Disapproval</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reason}
                onChange={handleReasonChange}
                placeholder="Enter reason for disapproval"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSend}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
export default Dialogue;

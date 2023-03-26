import React from "react";
import Table from "react-bootstrap/Table";

function History({ children }) {
  return (
    <div className="container_history">
      <Table striped bordered hover className="section_history_table">
        <thead>
          <tr>
            <th>Capacity(CM3)</th>
            <th>Level (CM3)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    </div>
  );
}

export { History };

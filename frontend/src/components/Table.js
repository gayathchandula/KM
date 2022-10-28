import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";

export default function TableChart(props) {
  return (
    <Table striped={true}>
      <Table.Head>
        {props.col.map((cell) => (
          <Table.HeadCell>{cell}</Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y">
        {props.data.map((item, index) => props.renderBody(item, index))}
      </Table.Body>
    </Table>
  );
}

import React from "react";
import { Col, Container, Row } from "reactstrap";

const Results = ({ result }) => {
  const { status, statusText, headers, host, protocol, ssl } = result[0];
  const pa11yIssues = result[1];

  const escapeHTML = (html) => {
    return html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const CardComp = ({ issue }) => {
    return (
      <div class="card mb-5">
        <div class="card-body">
          <h4>{issue.message}</h4>
          <p class="bg-light p-3 my-3">{escapeHTML(issue.context)}</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <br />
      <Container>
        {/* Basic info about status */}
        <Row>
          <Col xs={3}>Response Status: {status}</Col>
          <Col xs={3}>Status Message: {`"${statusText}"`}</Col>
          <Col xs={3}>Protocol: {protocol}</Col>
        </Row>
        <br />
        {/* SSL */}
        <Row>
          <Col>
            SSL Issuer: {ssl.issuer.CN}, {ssl.issuer.O}, {ssl.issuer.C}
          </Col>
        </Row>
        <br />
        <Row>
          <Col>Valid from: {ssl.valid_from}</Col>
        </Row>
        <Row>
          <Col>Valid to: {ssl.valid_to}</Col>
        </Row>
        {/* Pa11y */}
        <Row>
          <Col>
            <br />
            {pa11yIssues.map((issue) => (
              <CardComp issue={issue} />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Results;

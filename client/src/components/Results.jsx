import React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import exportFromJSON from "export-from-json";
import moment from "moment";

const Results = ({ result }) => {
  const { status, statusText, headers, host, protocol, ssl } = result[0];
  const pa11yIssues = result[1];
  const cookies = result[2];
  // name, value, domain, expires, httpOnly, secure, size
  // console.log(cookies);

  const CardComp = ({ issue }) => {
    return (
      <div className="card mb-4">
        <div className="card-body">
          <h4>{issue.message}</h4>
          <p className="bg-light p-3 my-3">{issue.context}</p>
        </div>
      </div>
    );
  };

  const escapeHTML = (html) => {
    return html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const handleDownload = () => {
    let accessibilityIssues = pa11yIssues.map((issue) => ({
      accessibilityIssueMessage: issue.message,
      issueContext: escapeHTML(issue.context),
    }));

    let data = [
      {
        host,
        status,
        statusText,
        protocol,
        sslIssuer: `${ssl.issuer.CN}, ${ssl.issuer.O}, ${ssl.issuer.C}`,
        sslValidFrom: ssl.valid_from,
        sslValidTo: ssl.valid_to,
      },
      ...accessibilityIssues,
    ];

    exportFromJSON({
      data,
      fileName: "report",
      exportType: exportFromJSON.types.xls,
    });
  };

  return (
    <div>
      <br />
      <div>
        <Button color="warning" onClick={handleDownload}>
          Download excel report
        </Button>
      </div>
      <br />
      <Container>
        {/* Basic info about status */}
        <Row>
          <Col>
            <div className="card mb-4">
              <div className="card-body">
                <h4>Response</h4>
                <div className="bg-light p-3 my-3 d-flex justify-content-around text-center">
                  <Col>Status: {status}</Col>
                  <Col>Message: {statusText}</Col>
                  <Col>Protocol: {protocol.substr(0, protocol.length - 1)}</Col>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {/* SSL */}
        <Row>
          <Col>
            <div className="card mb-4">
              <div className="card-body">
                <h4>SSL Certificate</h4>
                <div className="bg-light p-3 my-3 d-flex flex-column">
                  <Col>
                    SSL Issuer: {ssl.issuer.CN}, {ssl.issuer.O}, {ssl.issuer.C}
                  </Col>
                  <Col>Valid from: {ssl.valid_from}</Col>
                  <Col>Valid to: {ssl.valid_to}</Col>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {/* Cookies */}
        <Row>
          <Col>
            <h4>Cookies:</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            {cookies.map(
              ({ name, value, domain, expires, httpOnly, secure, size }) => (
                <div className="card mb-4" key={name}>
                  <div className="card-body">
                    <h4>
                      {name} = {value}
                    </h4>
                    <div className="bg-light p-3 my-3 d-flex flex-column">
                      <Col>Domain: {domain}</Col>
                      <Col>Expires: {moment(expires * 1000).format("LLL")}</Col>
                      <Col>httpOnly: {httpOnly ? "true" : "false"}</Col>
                      <Col>Secure: {secure ? "true" : "false"}</Col>
                      <Col>Size: {size}</Col>
                    </div>
                  </div>
                </div>
              )
            )}
          </Col>
        </Row>
        {/* Pa11y */}
        <Row>
          <Col>
            <h4>Accessibility Issues:</h4>
          </Col>
        </Row>
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

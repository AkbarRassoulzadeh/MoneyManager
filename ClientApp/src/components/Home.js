import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Row, Col, Card, CardTitle, CardText, Button,
} from 'reactstrap';
import './Home.css';

function Home() {
  const [transactions, setTransactions] = useState({ data: [], loading: true });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('transactions')
      .then((response) => response.json())
      .then((d) => setTransactions({ data: d, loading: false }))
      .catch(setError);
  }, []);

  if (error) {
    return (
      <>
        <h3>Error loading page!</h3>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    );
  }

  if (transactions.loading) {
    return <p><em>Loading...</em></p>;
  }

  return (
    <>
      <Summary data={transactions.data} />
      <Details data={transactions.data} />
    </>
  );
}

function Summary({ data }) {
  const [balance, incomes, expenses] = data
    .map((item) => (item.category.transactionType === 0 ? -item.amount : item.amount))
    .reduce((acc, item) => {
      let [blnc, incm, expn] = acc;
      if (item < 0) {
        expn += item;
      } else {
        incm += item;
      }
      blnc += item;
      return [blnc, incm, expn];
    }, [0, 0, 0]);
  return (
    <Row className="summary">
      <Col>
        <Card body className="text-center summary-card">
          <CardTitle tag="h5">
            Income
          </CardTitle>
          <CardText>
            {incomes}
          </CardText>
        </Card>
      </Col>
      <Col>
        <Card body className="text-center summary-card">
          <CardTitle tag="h5">
            Expenses
          </CardTitle>
          <CardText>
            {Math.abs(expenses)}
          </CardText>
        </Card>
      </Col>
      <Col>
        <Card body className="text-center">
          <CardTitle tag="h5">
            Balance
          </CardTitle>
          <CardText>
            {balance}
          </CardText>
        </Card>
      </Col>
    </Row>
  );
}

function Details({ data }) {
  const navigate = useNavigate();
  return (
    <table className="table table-striped" aria-labelledby="tabelLabel">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Description</th>
          <th>Category</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {data.map((transaction) => (
          <tr key={transaction.id}>
            <td>{(new Date(Date.parse(transaction.transactionDate))).toDateString()}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.description}</td>
            <td>{transaction.category.name}</td>
            <td>
              <Button
                to={`/edit/${transaction.id}`}
                className="edit-link"
                onClick={() => {navigate(`/edit/${transaction.id}`, {state: transaction})}}
                >Edit
              </Button>
              <Button
                className="edit-link"
                color="warning"
                onClick={() => {navigate(`/delete/${transaction.id}`)}}
              >Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Home;

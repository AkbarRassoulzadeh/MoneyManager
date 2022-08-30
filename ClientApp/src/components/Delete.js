import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

function Delete() {
  const navigate = useNavigate();
  const [data, setData] = useState({ transaction: {}, loading: true });
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`transactions/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((d) => setData({ transaction: d, loading: false }))
      .catch(setError);
  }, [id]);

  if (error) {
    return (
      <>
        <h3>Error deleting content!</h3>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    );
  }

  if (data.loading) {
    return <p>Deleting transaction...</p>;
  }

  return (
    <>
      <h3>The following transaction deleted </h3>
      <p>{`Amount: ${data.transaction.amount}`}</p>
      <p>{`Description: ${data.transaction.description}`}</p>
      <Button color="success" onClick={() => navigate('/', { replace: true })}>
        Back to Home
      </Button>
    </>
  );
}

export default Delete;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from 'reactstrap';

function Add() {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryTypes = ['Expense', 'Income'];
  // ----------reactstrap states-------------
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  // ----------app states--------------------
  const [categoryData, setCategoryData] = useState({ data: [], loading: true });
  const [category, setCategory] = useState(categoryTypes[0]);
  const [active, setActive] = useState(true);
  const [formData, setFormData] = useState({
    amount: 0,
    category: 'Food',
    description: '',
  });
  const [error, setError] = useState(null);
  const isEdit = () => location.pathname.indexOf('edit') !== -1;

  useEffect(() => {
    fetch('/categories')
      .then((response) => response.json())
      .then((categories) => setCategoryData({ data: categories, loading: false }))
      .catch(setError);
    if (!error && isEdit()) {
      // Change transaction data that comes from Home to be compatible with
      // Form data here.
      setCategory(categoryTypes[location.state.category.transactionType]);
      setFormData({
        id: location.state.id,
        amount: location.state.amount,
        description: location.state.description,
        category: location.state.category.name,
        transactionDate: location.state.transactionDate,
      });
    }
  }, []);

  useEffect(() => {
    if (active) return;
    const requestOpt = {
      method: isEdit() ? 'Put' : 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    fetch('transactions', requestOpt)
      .then((response) => response.json())
      .then(() => navigate('/', { replace: true }))
      .catch(setError);
  });

  function handleSubmit() {
    setActive(false);
    const categoryId = categoryData.data.find(
      (ctg) => ctg.name === formData.category,
    ).categoryID;

    // If it's an Add, then append a transaction date to the object
    // otherwise Form data has an id and date.
    setFormData((prev) => {
      if (!isEdit()) {
        return {
          amount: prev.amount,
          description: prev.description,
          transactionDate: new Date().toJSON(),
          categoryID: categoryId,
        };
      }
      return {
        id: prev.id,
        amount: prev.amount,
        description: prev.description,
        categoryID: categoryId,
        transactionDate: prev.transactionDate,
      };
    });
  }

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function firstInCategoryGroup(groupName) {
    return categoryData.data.find(
      (c) => categoryTypes[c.transactionType] === groupName,
    ).name;
  }

  function setCategoryGroup(name) {
    setCategory(name);
    setFormData((prev) => ({ ...prev, category: firstInCategoryGroup(name) }));
  }

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  if (categoryData.loading) {
    return (
      <p>
        <em>Loading...</em>
      </p>
    );
  }
  return (
    <Form>
      <FormGroup key="amount">
        <Label for="amount">Amount</Label>
        <Input
          id="amount"
          name="amount"
          placeholder="0"
          type="number"
          min={0}
          onChange={handleChange}
          value={formData.amount}
        />
      </FormGroup>
      <FormGroup key="category">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>{category}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              key="expense"
              onClick={() => setCategoryGroup('Expense')}
            >
              Expense
            </DropdownItem>
            <DropdownItem
              key="income"
              onClick={() => setCategoryGroup('Income')}
            >
              Income
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Input
          id="category"
          name="category"
          type="select"
          onChange={handleChange}
          value={formData.category}
        >
          {categoryData.data
            .filter((ctg) => categoryTypes[ctg.transactionType] === category)
            .map((ctg) => (
              <option key={ctg.id} value={ctg.name}>
                {ctg.name}
              </option>
            ))}
        </Input>
      </FormGroup>
      <FormGroup key="description">
        <Label for="description">Description</Label>
        <Input
          id="description"
          name="description"
          type="textarea"
          onChange={handleChange}
          value={formData.description}
        />
      </FormGroup>
      <SubmitButton active={active} onSubmit={handleSubmit} />
    </Form>
  );
}

function SubmitButton({ active, onSubmit }) {
  if (active) {
    return (
      <Button color="primary" onClick={onSubmit}>
        Submit
      </Button>
    );
  }
  return (
    <Button color="primary" disabled>
      <Spinner size="sm">Loading...</Spinner>
      <span> Loading</span>
    </Button>
  );
}

export default Add;

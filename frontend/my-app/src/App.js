import React from 'react';
import './App.css';

const json = {
  expenses: {
    "+1": {name: "Мирофбар", category: "Развлечения", price: 1800 },
    "+2": {name: "ВкусВилл", category: "Еда", price: 560 },
    "+3": {name: "Каток", category: "Развлечения", price: 450 },
    "+4": {name: "ЦППК", category: "Обязательные", price: 27 },
    "+5": {name: "Общага", category: "Обязательные", price: 751 },
  }
}


function App() {
  return (
    <div className="App container">
      <Expenses expenses={json.expenses} />
      
    </div>
  );
}


class Modal extends React.Component {
  render() {
    return (
      <div className='modalwindow'>
        <div className='modal__backdrop' onClick={this.props.closeFunction}></div>
        <div className='modal__content container'>
          <div className='modal__header'>
            <button className='btn-close text-reset' onClick={this.props.closeFunction}></button>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }

}


class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEdit: false, expenses: props.expenses };
    this.edit = this.edit.bind(this);
  }

  edit() {
    this.setState(
      function (state) {
        return { isEdit: !state.isEdit };
      }
    );
    console.log("1");
  }

  render() {
    return (
      <div>
        <h1 className='display-1 pt-2'>Расходы</h1>
        <ExpenseEditButton edit={this.edit} isEdit={this.state.isEdit} />
        <ExpenseList expenses={json.expenses} isEdit={this.state.isEdit} />
        {this.state.isEdit && <Modal closeFunction={this.edit}><h1>hello</h1></Modal>}
      </div>
    );
  }
}

class ExpenseEditButton extends React.Component {
  render() {
    return (
      <div className="d-grid gap-2 pb-2">
        <button className="btn btn-primary" type="button" onClick={this.props.edit}>
          {this.props.isEdit ? 'Отменить' : 'Изменить'}
        </button>
      </div>
    )
  }
}

class ExpenseList extends React.Component {
  constructor(props) {
    super(props);
    this.openItemMore = this.openItemMore.bind(this);
    this.editItem = this.editItem.bind(this);
    this.state = { expenses: props.expenses, isOpenMore: false };
  }

  openItemMore(key) {
    this.setState({isOpenMore: key});
  }

  editItem(expense, key) {
    if (expense.key === undefined) {
      console.log(2);
    } else {
      this.setState((state) => {
        let expenses = state.expenses;
        expenses[key] = expense;
        return {expenses: expenses, isOpenMore: false};
      });
    }
  }

  render() {
    const expenses = this.state.expenses;
    let expenseList =[];
    for (let key in expenses) {
      expenseList.push(<ExpenseItem key={key} mykey={key} expense={expenses[key]} editItem={this.openItemMore} />)
    }
    return (
      <div>
        {this.state.isOpenMore && <ExpenseItemMore expense={this.state.expenses[this.state.isOpenMore]} returnExpense={this.editItem}/>}
        <ul className='list-group'>
          {expenseList}
        </ul>
      </div>
    );
  }
}


class ExpenseItem extends React.Component {
  render() {
    return (
      <li className='list-group-item d-flex justify-content-between align-items-start' onClick={this.props.editItem(this.props.mykey)}>
        <div className='ms-2 me-auto'>
          <div className='fw-bold'>{this.props.expense.name}</div>
          {this.props.expense.category}
        </div>
        <span className='badge bg-secondary rounded-pill'>{this.props.expense.price}</span>
      </li>
    );
  }
}


class ExpenseItemMore extends React.Component {
  render() {
    return (
      <Modal>
        
      </Modal>
    );
  }
}



export default App;

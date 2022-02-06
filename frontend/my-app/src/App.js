import React from 'react';
import './App.css';

const json = {
  expenses: [
    { name: "Мирофбар", category: "Развлечения", price: 1800 },
    { name: "ВкусВилл", category: "Еда", price: 560 },
    { name: "Каток", category: "Развлечения", price: 450 },
    { name: "ЦППК", category: "Обязательные", price: 27 },
    { name: "Общага", category: "Обязательные", price: 751 },
  ]
}


function App() {
  return (
    <div className="App container">
      <Expenses expenses={json.expenses} />
    </div>
  );
}


// class Clock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { date: new Date() };
//   }

//   componentDidMount() {
//     this.timerID = setInterval(
//       () => this.tick(),
//       Number(this.props.time)
//     );
//   }

//   componentWillUnmount() {
//     clearInterval(this.timerID);
//   }

//   tick() {
//     this.setState({
//       date: new Date()
//     });
//   }

//   render() {
//     return (
//       <div>
//         <h1>Привет, мир!</h1>
//         <h2>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
//       </div>
//     );
//   }
// }

class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isEdit: false, expenses: props.expenses};
    this.edit = this.edit.bind(this);
  }

  edit() {
    this.setState(
      function (state) {
        return {isEdit: !state.isEdit};
      }
    );
    console.log("1");
  }

  render() {
    return (
      <div>
        <h1 className='display-1 pt-2'>Расходы</h1>
        <ExpenceEditButton edit={this.edit} isEdit={this.state.isEdit} />
        <ExpenseList expenses={json.expenses} isEdit={this.state.isEdit}/>
      </div>
    );
  }
}

class ExpenceEditButton extends React.Component {
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
    const expenses = props.expenses;
    this.state = {
      expensesList: expenses.map(
        (ex, i) => <ExpenseItem key={i.toString()} name={ex.name} category={ex.category} price={ex.price} />
      )
    };
  }

  render() {
    return (
      <div>
        <ul className='list-group'>
          {this.state.expensesList}
        </ul>
      </div>
    );
  }
}


class ExpenseItem extends React.Component {
  render() {
    return (
      <li className='list-group-item d-flex justify-content-between align-items-start'>
        <div className='ms-2 me-auto'>
          <div className='fw-bold'>{this.props.name}</div>
          {this.props.category}
        </div>
        <span className='badge bg-secondary rounded-pill'>{this.props.price}</span>
      </li>
    );
  }
}

export default App;

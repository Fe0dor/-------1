import React from 'react';
import './App.css';

const json = {
  expenses: [
    { name: "Мирофбар", category: "Развлечения", price: 1800 },
    { name: "ВкусВилл", category: "Еда", price: 560 },
    { name: "Каток", category: "Развлечения", price: 450 },
  ]
}

function App() {
  return (
    <div className="App container">
      <ExpenseList expenses={json.expenses} />
    </div>
  );
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      Number(this.props.time)
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

// class Note extends React.Component {
//   render() {
//     return (
//       <div class="card">
//         <div class="card-body">
//           <h5 class="card-title">{this.props.name}</h5>
//           <h6 class="card-subtitle mb-2 text-muted">{this.props.category}</h6>
//           <a href="#" class="card-link">Card link</a>
//           <a href="#" class="card-link">Another link</a>
//         </div>
//       </div>
//     );
//   }
// }


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
        <h1 className='display-1 pt-2'>Расходы</h1>
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

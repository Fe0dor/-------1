import './App.css';

const json = {
  categories: {
    0: {name: 'Не учитывать', color: 'rgb(256, 256, 256, 0.5)'},
    1: {name: 'Развлечения', color: '#f9bf3b'}, //1
    2: {name: 'Дом', color: '#a37c82'}, //1
    3: {name: 'Здоровье', color: '#16a085'}, //1
    4: {name: 'Образование', color: '#1e517b'},
    5: {name: 'Одежда', color: '#fe7968'}, //1
    6: {name: 'Продукты', color: '#eb9532'}, //1
    7: {name: 'Обязательные', color: '#22313f'},
    8: {name: 'Перевод', color: '#524eb7'}
  },
  expense: [
    {id: 1, time: '2021-12-26T13:51:50.417Z', name: 'Мирофбар', costMapCategory: [[1, -1800]]},
    {id: 2, time: '2021-12-27T13:51:50.417Z', name: 'ВкусВилл', costMapCategory: [[2, -540], [6, -1305.99]]},
    {id: 3, time: '2021-01-26T13:51:50.417Z', name: 'ЦППК', costMapCategory: [[7, -27]]},
    {id: 4, time: '2021-02-05T13:51:50.417Z', name: 'Пополнение', costMapCategory: [[8, 2000]]},
    {id: 5, time: '2022-01-01T13:51:50.417Z', name: 'Дикси', costMapCategory: [[6, -1247]]},
    {id: 6, time: '2022-01-15T13:51:50.417Z', name: 'Улыбка Радуги', costMapCategory: [[2, -330]]},
    {id: 7, time: '2022-02-18T13:51:50.417Z', name: 'Хеликс', costMapCategory: [[3, -330]]},
    {id: 8, time: '2022-02-23T13:51:50.417Z', name: 'Общежитие', costMapCategory: [[4, -751]]},
    {id: 9, time: '2022-02-12T13:51:50.417Z', name: 'Nike', costMapCategory: [[5, -27]]},
  ],
}

function App() {
  return (
    <div>
      <OperationList operations={json.expense} categories={json.categories} />
    </div>
  );
}

function OperationList(props) {
  const operations = props.operations;
  const listItems = operations.map((operation, i) =>
    <OperationRow key={i.toString()} operation={operation} categories={props.categories} />
  );
  return (
    <div>
      {listItems}
    </div>
  );
}

function DateRow(props) {

}

function OperationRow(props) {
  const categories = props.categories;
  const operation = props.operation;
  let list = [];
  let cost = 0;
  let colors = [];
  if (operation.costMapCategory.length === 1) {
    list = [<div className='OperationRow__category' key={0}>{categories[operation.costMapCategory[0][0]].name}</div>];
    cost = operation.costMapCategory[0][1];
    colors = [categories[operation.costMapCategory[0][0]].color];
  } else {
    list = operation.costMapCategory.map((i) =>
      <div className='OperationRow__category' key={i}><div>{categories[i[0]].name}</div><div>{i[1]}</div></div>
    );
    colors = operation.costMapCategory.map((i) => categories[i[0]].color);
    for (let i of operation.costMapCategory) {
      if (i[0] !== 0) cost += i[1];
    }
  }
  return (
    <div className='OperationRow'>
      <div className='OperationRow__avatar' style={colors.length === 1 ? {backgroundColor: colors[0]} : {background: `linear-gradient(70deg, ${colors.join()})`}}></div>
      <div className='OperationRow__textblock'>
        <div className='OperationRow__header'>
          <div>{operation.name}</div>
          <div style={cost > 0 ? {color: '#16a085'} : {}}>{cost}</div>
        </div>
        {list}
      </div>
    </div>
  );
}

export default App;

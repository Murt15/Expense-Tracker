import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";
const ExpensesList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">Found No Expenses</h2>;
  }
  if (props.items.length === 1) {
    //console.log(props);
    return (
      <div>
        <ExpenseItem
          key={props.items[0].id}
          title={props.items[0].title}
          category={props.items[0].category}
          amount={props.items[0].amount}
          date={props.items[0].date}
        />
        <h2 className="expenses-list__fallback">
          Only single Expense here. Please add more...
        </h2>
      </div>
    );
  }
  return (
    <ul className="expenses-list">
      {props.items.map((e) => (
        <ExpenseItem
          key={e.id}
          title={e.title}
          amount={e.amount}
          date={e.date}
        />
      ))}
    </ul>
  );
};
export default ExpensesList;

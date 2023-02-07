import NewExpense from "../components/NewExpenses/NewExpense";
import Expenses from "../components/Expenses/Expenses";
const expenses = [
  {
    id: "e1",
    title: "Toilet Paper",
    category: "Misc",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  {
    id: "e2",
    title: "New TV",
    category: "Misc",
    amount: 799.49,
    date: new Date(2021, 2, 12),
  },
  {
    id: "e3",
    title: "Car Insurance",
    category: "Misc",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    category: "Misc",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];
const Home = () => {
  return (
    <>
      {/* <NewExpense onAddExpense={addExpenseHandler} /> */}
      <NewExpense />
      <Expenses items={expenses} />
    </>
  );
};

export default Home;

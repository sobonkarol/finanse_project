import { useState } from "react";
import { Button, Stack } from "react-bootstrap"
import Container from "react-bootstrap/Container";
import AddBudgetModel from "./components/AddBudgetModel";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setShowAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setShowAddExpenseModalBudgetId(budgetId)
  }

  return ( 
    <>
  <Container className="my-4">
    <Stack direction="horizontal" gap="2" className="mb-4">
      <h1 className="me-auto"><img src={require('./logo.png')} /></h1>
      <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Dodaj kategorię budżetu</Button>
      <Button variant="outline-primary" onClick={openAddExpenseModal}>Dodaj wydatki</Button>
  </Stack>
  <div 
    style={{ 
    display:"grid", 
    gridTemplateColums: "repeat(auto-fill, minmax(300px, 1fr))", 
    gap: "1rem", 
    alignItems: "flex-start",
  }}
    >
      <TotalBudgetCard />
      {budgets.map(budget => {
        const amount = getBudgetExpenses(budget.id).reduce(
          (total, expense) => total + expense.amount, 
          0
        )
        return (
      <BudgetCard 
      key={budget.id}
      name={budget.name} 
      amount={amount} 
      max={budget.max}
      onAddExpenseClick={() => openAddExpenseModal(budget.id)}
      onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
      />
        )
})}
      <UncategorizedBudgetCard 
      onAddExpenseClick={openAddExpenseModal}
      onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)} />
    </div>
  </Container>
  <AddBudgetModel 
    show={showAddBudgetModal} 
    handleClose={() => setShowAddBudgetModal(false)} 
  />
    <AddExpenseModal 
    show={showAddExpenseModal} 
    defaultBudgetId={addExpenseModalBudgetId}
    handleClose={() => setShowAddExpenseModal(false)} 
  />
   <ViewExpensesModal 
    budgetId={viewExpensesModalBudgetId}
    handleClose={() => setViewExpensesModalBudgetId()} 
  />
  </>
  )
}

export default App;

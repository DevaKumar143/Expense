const express = require("express");
const {createExpense,getExpenses,getExpenseById,deleteExpense, } = require("../controller/expense.controller");
const Auth = require("../middleware/Auth");
const router = express.Router();


router.post("/expenses", Auth, createExpense);
router.get("/expenses",Auth, getExpenses);
router.get("/expenses/:id", Auth, getExpenseById);
router.delete("/expenses/:id", Auth, deleteExpense);

module.exports = router;
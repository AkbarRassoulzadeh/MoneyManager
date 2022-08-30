namespace MoneyManager.Models;

public static class DbInitializer
{
    public static void Initialize(TransactionContext context)
    {
        if (context.Categories.Any())
        {
            return;
        }

        var categories = new Category[]
        {
            new Category{Name="Food", TransactionType=TransactionType.Expense},
            new Category{Name="Bills", TransactionType=TransactionType.Expense},
            new Category{Name="Transportation", TransactionType=TransactionType.Expense},
            new Category{Name="Home", TransactionType=TransactionType.Expense},
            new Category{Name="Car", TransactionType=TransactionType.Expense},
            new Category{Name="Entertainment", TransactionType=TransactionType.Expense},
            new Category{Name="Shopping", TransactionType=TransactionType.Expense},
            new Category{Name="Clothing", TransactionType=TransactionType.Expense},
            new Category{Name="Insurance", TransactionType=TransactionType.Expense},
            new Category{Name="Tax", TransactionType=TransactionType.Expense},
            new Category{Name="Telephone", TransactionType=TransactionType.Expense},
            new Category{Name="Health", TransactionType=TransactionType.Expense},
            new Category{Name="Sport", TransactionType=TransactionType.Expense},
            new Category{Name="Baby", TransactionType=TransactionType.Expense},
            new Category{Name="Pet", TransactionType=TransactionType.Expense},
            new Category{Name="Beauty", TransactionType=TransactionType.Expense},
            new Category{Name="Electronics", TransactionType=TransactionType.Expense},
            new Category{Name="Vegetables", TransactionType=TransactionType.Expense},
            new Category{Name="Gift", TransactionType=TransactionType.Expense},
            new Category{Name="Snacks", TransactionType=TransactionType.Expense},
            new Category{Name="Travel", TransactionType=TransactionType.Expense},
            new Category{Name="Education", TransactionType=TransactionType.Expense},
            new Category{Name="Fruits", TransactionType=TransactionType.Expense},
            new Category{Name="Book", TransactionType=TransactionType.Expense},
            new Category{Name="Laundry", TransactionType=TransactionType.Expense},
            new Category{Name="Haircut", TransactionType=TransactionType.Expense},
            new Category{Name="Salary", TransactionType=TransactionType.Income},
            new Category{Name="Sale", TransactionType=TransactionType.Income},
            new Category{Name="Rental", TransactionType=TransactionType.Income},
            new Category{Name="Dividends", TransactionType=TransactionType.Income},
            new Category{Name="Investments", TransactionType=TransactionType.Income},
        };
        context.Categories.AddRange(categories);
        context.SaveChanges();

        var transactions = new MoneyTransaction[]
        {
            new MoneyTransaction{Description="Pizza for diner", Amount=95000, TransactionDate=DateTime.Parse("2022-06-01"), CategoryID=1},
            new MoneyTransaction{Description="Hair cut in new Salon", Amount=65000, TransactionDate=DateTime.Parse("2022-09-19"), CategoryID=26},
            new MoneyTransaction{Description="Water bills", Amount=50000, TransactionDate=DateTime.Parse("2022-04-15"), CategoryID=2},
            new MoneyTransaction{Description="Apples and Some bananas", Amount=75000, TransactionDate=DateTime.Parse("2022-08-01"), CategoryID=23},
            new MoneyTransaction{Description="Salary from a gig", Amount=150000, TransactionDate=DateTime.Parse("2022-06-01"), CategoryID=27},

        };
        context.MoneyTransactions.AddRange(transactions);
        context.SaveChanges();
    }
}
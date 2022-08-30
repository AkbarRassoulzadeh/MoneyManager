using System.Text.Json.Serialization;

namespace MoneyManager.Models;

public enum TransactionType { Expense, Income }

public class Category
{
    public int CategoryID { get; set; }
    public string Name { get; set; }
    public TransactionType TransactionType { get; set; }
    [JsonIgnore]
    public ICollection<MoneyTransaction> MoneyTransactions { get; set; }
}
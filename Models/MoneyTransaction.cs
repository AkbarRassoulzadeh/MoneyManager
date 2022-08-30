namespace MoneyManager.Models;

public class MoneyTransaction
{
    public int ID { get; set; }
    public virtual Category Category { get; set; }
    public int CategoryID { get; set; }
    public string Description { get; set; }
    public decimal Amount { get; set; }
    public DateTime TransactionDate { get; set; }
}
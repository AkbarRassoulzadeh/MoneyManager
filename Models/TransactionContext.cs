namespace MoneyManager.Models;
using Microsoft.EntityFrameworkCore;

public class TransactionContext : DbContext
{
    public TransactionContext(DbContextOptions<TransactionContext> options) : base(options)
    {
    }

    public DbSet<Category> Categories { get; set; }
    public DbSet<MoneyTransaction> MoneyTransactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>().ToTable("Category");
        modelBuilder.Entity<MoneyTransaction>().ToTable("MoneyTransaction");
    }

}
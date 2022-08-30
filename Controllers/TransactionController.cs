namespace MoneyManager.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyManager.Models;

[ApiController]
[Route("[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly TransactionContext _context;
    public TransactionsController(TransactionContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllTransactions()
    {
        var transactions = await _context.MoneyTransactions
            .Include(t => t.Category)
            .OrderByDescending(t => t.TransactionDate)
            .ToArrayAsync();
        return Ok(transactions);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetTransaction(int id)
    {
        var transaction = await _context.MoneyTransactions
            .Include(t => t.Category)
            .Where(t => id == t.ID)
            .FirstAsync();
        if (transaction != null)
        {
            return Ok(transaction);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpPost]
    public async Task<ActionResult<MoneyTransaction>> PostTransaction([FromBody] MoneyTransaction transaction)
    {
        _context.MoneyTransactions.Add(transaction);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetTransaction", new { id = transaction.ID }, transaction);
    }

    [HttpPut]
    public async Task<IActionResult> PutTransaction([FromBody] MoneyTransaction transaction) 
    {
        _context.Entry(transaction).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (_context.MoneyTransactions.Find(transaction.ID) == null)
            {
                return NotFound();
            }
            throw;
        }
        return Ok(transaction);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<MoneyTransaction>> DeleteTransaction(int id)
    {
        var transaction = await _context.MoneyTransactions.FindAsync(id);
        if (transaction == null)
        {
            return NotFound();
        }
        _context.MoneyTransactions.Remove(transaction);
        await _context.SaveChangesAsync();
        return transaction;
    }
}

[ApiController]
[Route("[Controller]")]
public class CategoriesController : ControllerBase
{
    private readonly TransactionContext _context;
    public CategoriesController(TransactionContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _context.Categories.ToArrayAsync();
        if (categories == null)
        {
            return NotFound();
        }
        else
        {
            return Ok(categories);
        }
    }
}


using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FurBaby.Model;
using FurBaby.Model.Models;

namespace FurBaby.ApiService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly BreederContext _context;
        public AdminController(BreederContext context)
        {
            _context = context;
        }

        // Breeder CRUD
        [HttpGet("breeders")] // List all breeders
        public async Task<IActionResult> GetBreeders() => Ok(await _context.Breeders.Include(b => b.Pets).ToListAsync());

        [HttpPost("breeder")] // Add breeder
        public async Task<IActionResult> AddBreeder([FromBody] Breeder breeder)
        {
            _context.Breeders.Add(breeder);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBreeders), new { id = breeder.Id }, breeder);
        }

        [HttpPut("breeder/{id}")] // Edit breeder
        public async Task<IActionResult> EditBreeder(Guid id, [FromBody] Breeder breeder)
        {
            if (id != breeder.Id) return BadRequest();
            _context.Entry(breeder).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("breeder/{id}")] // Delete breeder
        public async Task<IActionResult> DeleteBreeder(Guid id)
        {
            var breeder = await _context.Breeders.FindAsync(id);
            if (breeder == null) return NotFound();
            _context.Breeders.Remove(breeder);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Pet CRUD
        [HttpGet("pets")] // List all pets
        public async Task<IActionResult> GetPets() => Ok(await _context.Set<Pet>().Include(p => p.Breeder).Include(p => p.Breed).ToListAsync());

        [HttpGet("pet/{id}")] // View pet
        public async Task<IActionResult> GetPet(Guid id)
        {
            var pet = await _context.Set<Pet>().Include(p => p.Breeder).Include(p => p.Breed).FirstOrDefaultAsync(p => p.Id == id);
            if (pet == null) return NotFound();
            return Ok(pet);
        }

        [HttpPost("pet")] // Add pet
        public async Task<IActionResult> AddPet([FromBody] Pet pet)
        {
            _context.Set<Pet>().Add(pet);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPet), new { id = pet.Id }, pet);
        }

        [HttpPut("pet/{id}")] // Edit pet
        public async Task<IActionResult> EditPet(Guid id, [FromBody] Pet pet)
        {
            if (id != pet.Id) return BadRequest();
            _context.Entry(pet).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

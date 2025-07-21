using FurBaby.Model.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace FurBaby.Model
{
    public class BreederContext(DbContextOptions<BreederContext> options) : DbContext(options)
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Pet>()
                .HasOne(e => e.Breed)
                .WithMany(e => e.Pets)
                .OnDelete(DeleteBehavior.ClientNoAction);

            modelBuilder
               .Entity<Breed>()
               .HasOne(e => e.Species)
               .WithMany(e => e.Breeds)
               .OnDelete(DeleteBehavior.ClientNoAction);

            // Seed static data for Species
            modelBuilder.Entity<Sex>().HasData(
                new Sex { Id = 1, Name = "Male" },
                new Sex { Id = 2, Name = "Female" }
                );

            // Seed static data for Species
            modelBuilder.Entity<Species>().HasData(
                new Species { Id = 1, Name = "Dog" },
                new Species { Id = 2, Name = "Cat" }
            );
        }

        public DbSet<Breeder> Breeders { get; set; }
        
        public DbSet<Species> Species { get; set; }
        
        public DbSet<Breed> Breeds { get; set; }

        public DbSet<Pet> Pets { get; set; }

        public DbSet<Sex> Sexes { get; set; }
    }
}

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FurBaby.Model.Models
{
    public class Pet
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Name { get; set; } = string.Empty;

        public Breeder Breeder { get; set; } = null!;

        public bool IsParent { get; set; } = false;

        public int BreedId { get; set; }
        public Breed Breed { get; set; } = null!;
        public Sex Sex { get; set; } = null!;

        public string? ImageUrl { get; set; } = string.Empty; // URL or blob reference
    }
}

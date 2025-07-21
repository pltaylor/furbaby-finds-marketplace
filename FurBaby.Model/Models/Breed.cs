using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FurBaby.Model.Models
{
    public class Breed
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public int SpeciesId { get; set; }
        public Species Species { get; set; } = null!;

        public ICollection<Pet> Pets { get; set; } = new List<Pet>();
    }
}

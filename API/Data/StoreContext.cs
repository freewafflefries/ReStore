using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : IdentityDbContext<User, Role, int>
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //Create the User entity (table)
            builder.Entity<User>()
            //For which the Address property has a relationship to another entity 
                .HasOne(a => a.Address)
            //Which is a One-to-One relationship
                .WithOne()
            //Our User entity will have a foreign key to the Id property of the UserAddress Entity
                .HasForeignKey<UserAddress>(a => a.Id)
            //And should we delete a User record, we will cascading delete to the UserAddress record 
                .OnDelete(DeleteBehavior.Cascade);


            builder.Entity<Role>()
                .HasData(
                    new Role { Id = 1, Name = "Member", NormalizedName = "MEMBER" },
                    new Role { Id = 2, Name = "Admin", NormalizedName = "ADMIN" }
                );


        }
    }
}
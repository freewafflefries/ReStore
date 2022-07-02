using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class UserAddress : Address
    {
        public int Id { get; set; }

        //And also all the other properties of the Address class
    }
}
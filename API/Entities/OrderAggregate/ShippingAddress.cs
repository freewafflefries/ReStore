using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate
{
    [Owned]
    public class ShippingAddress : Address
    {
        //No Additional properties needed.
        //Will base solely on the Address class
    }
}
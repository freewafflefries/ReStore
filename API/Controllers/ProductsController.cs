using System.Runtime.Serialization;
using System.Net.Http.Headers;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.RequestHelpers;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using API.DTOs;
using AutoMapper;
using API.Services;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;
        public ProductsController(StoreContext context, IMapper mapper, ImageService imageService)
        {
            _imageService = imageService;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = _context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            Response.Headers.Add("Pagination", JsonSerializer.Serialize(products.MetaData, options));


            return products;
            //return products;
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;

        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult> CreateProduct([FromForm] CreateProductDto createProductDto)
        {
            var product = _mapper.Map<Product>(createProductDto);

            if (createProductDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(createProductDto.File);

                if (imageResult.Error != null)
                {
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                }

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;

            }

            _context.Products.Add(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetProduct", new { Id = product.Id }, product);

            return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm] UpdateProductDto updateProductDto)
        {
            var product = await _context.Products.FindAsync(updateProductDto.Id);

            if (product == null) return NotFound();

            _mapper.Map(updateProductDto, product);

            if (updateProductDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(updateProductDto.File);

                if (imageResult.Error != null)
                {
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                }

                if (string.IsNullOrEmpty(product.PublicId))
                {
                    await _imageService.DeleteImageAsync(product.PublicId);
                }

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(product);

            return BadRequest(new ProblemDetails { Title = "Problem Updating product!" });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            if (!string.IsNullOrEmpty(product.PublicId))
            {
                await _imageService.DeleteImageAsync(product.PublicId);
            }

            _context.Products.Remove(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem Deleting product!" });

        }
    }
}
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ImagesController : BaseApiController
{
    private readonly IWebHostEnvironment _env;
    private readonly StoreContext _context;

    public ImagesController(IWebHostEnvironment env, StoreContext context)
    {
        _env = env;
        _context = context;
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteImage(int id)
    {
        var image = await _context.Images.FindAsync(id);
        if (image == null) return NotFound();
        _context.Images.Remove(image);
        await _context.SaveChangesAsync();
        return Ok(image);
    }


    [HttpPost]
    public async Task<ActionResult> UploadImage(IFormFile image)
    {
        if (image == null || image.Length == 0)
        {
            return BadRequest();
        }

        var imageName = Guid.NewGuid() + Path.GetExtension(image.FileName);
        var imagePath = Path.Combine(_env.WebRootPath, "uploads",
            imageName);


        using (var stream = new FileStream(imagePath, FileMode.Create))
        {
            await image.CopyToAsync(stream);
        }


        var imgItem = new Image { Url = string.Concat("http://localhost:5233/uploads/", imageName) };
        _context.Images.Add(imgItem);

        var res = await _context.SaveChangesAsync();
        if (res == 0) return BadRequest("Failed to upload image");
        return Ok(imgItem);
    }


    [HttpGet]
    public async Task<ActionResult> GetImages()
    {
        var images = await _context.Images.ToListAsync();
        return Ok(images);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetImage(int id)
    {
        var image = await _context.Images.FindAsync(id);
        return Ok(image);
    }
}
using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class PhotosessionController : BaseApiController
{
    private readonly StoreContext _context;
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;


    public PhotosessionController(StoreContext context, IMapper mapper, UserManager<User> userManager)
    {
        _context = context;
        _mapper = mapper;
        _userManager = userManager;
    }

    [HttpGet("getUserPhotosession")]
    [Authorize(Roles = "Member")]
    public async Task<ActionResult<List<Photosession>>> GetUsersPhotosession()
    {
        var userId = await GetClientId();
        var photosession = await _context.Photosession.Where(item => item.ClientId == userId).Include(x => x.Photos)
            .ToListAsync();
        
        return Ok(photosession);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<List<Photosession>>> GetPhotosessions(int userId)
    {
        var photosessions = await _context.Photosession.Where(photos => photos.ClientId == userId)
            .Include(x => x.Photos)
            .ToListAsync();

        return Ok(photosessions);
    }


    [Authorize(Roles = "Admin")]
    [HttpPost("CreatePhotosession")]
    public async Task<ActionResult<Photosession>> CreatePhotosession(PhotosessionDto photosessionDto)
    {
        var photosession = new Photosession();
        _mapper.Map(photosessionDto, photosession);

        photosession.Photos = new List<Image>();

        foreach (var imageId in photosessionDto.PhotosId)
        {
            var imgItem = await _context.Images.FirstOrDefaultAsync(item => item.Id == imageId);
            photosession.Photos.Add(imgItem);
        }

        _context.Photosession.Add(photosession);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest(new ProblemDetails { Title = "Could creaet a photosession" });

        return Ok(photosession);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("newPhotosession")]
    public ActionResult<PhotosessionDto> GetNewPhotosession()
    {
        var photosession = new PhotosessionDto();
        photosession.PhotosId = new List<int>();
        return photosession;
    }

    [Authorize(Roles = "Member")]
    [HttpPost("AttachPhotosession")]
    public async Task<ActionResult> AttachPhotosession(string key)
    {
        var client = await GetClientId();

        var photosession = await _context.Photosession.FirstOrDefaultAsync(item => item.PhotosessionKey == key);

        if (photosession == null) return NotFound();

        photosession.ClientId = client;

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest(new ProblemDetails { Title = "Could attach photosession" });

        return Ok();
    }

    private async Task<int> GetClientId()
    {
        var username = User.Identity!.Name;
        var user = await _userManager.Users.FirstOrDefaultAsync(user => user.UserName == username);

        if (user == null) return 0;
        return user.Id;
    }
}
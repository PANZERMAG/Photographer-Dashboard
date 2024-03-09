namespace API.DTOs;

public class PhotosessionDto
{
    public string Title { get; set; } = "";
    public bool Reviewed { get; set; } = false;
    public DateTime Date { get; set; }
    public List<int> PhotosId { get; set; }
    public string PhotosessionKey { get; set; }
}
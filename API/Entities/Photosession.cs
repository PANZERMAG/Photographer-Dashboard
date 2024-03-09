namespace API.Entities;

public class Photosession
{
    public int Id { get; set; }
    public string Title { get; set; }
    public bool Reviewed { get; set; }
    public DateTime Date { get; set; }
    public List<Image> Photos { get; set; }
    public int ClientId { get; set; }
    public string PhotosessionKey { get; set; }
}
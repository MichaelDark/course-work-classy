using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Classy.Web.NewApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        public static string URL { get; set; } = @"https://classy-classifier.herokuapp.com/classifier";

        private readonly ConcurrentDictionary<string, ICollection<IFormFile>> _userImages;

        public ImageController(ConcurrentDictionary<string, ICollection<IFormFile>> savedImages)
        {
            _userImages = savedImages;
        }


        [HttpPost("classify-single")]
        public async Task<IActionResult> PostSingleImage(IFormFile images)
        {
            var uploadedImages = new IFormFile[] { images };
            SaveUserImages(uploadedImages);

            return Ok(await ClassifyImages(uploadedImages));
        }

        [HttpPost("classify-multiple")]
        public async Task<IActionResult> PostMultipleImages(IFormFileCollection images)
        {
            SaveUserImages(images);

            return Ok(await ClassifyImages(images));
        }

        private void SaveUserImages(IEnumerable<IFormFile> images)
        {
            string userId = GetOrAppendToCookie("ClassyId", Guid.NewGuid().ToString());

            var userFiles = _userImages.GetOrAdd(userId, new List<IFormFile>());
            foreach (var imageFile in images)
            {
                userFiles.Add(imageFile);
            }
        }

        private string GetOrAppendToCookie(string cookieName, string defaultValue)
        {
            string cookieValue;
            if (!Request.Cookies.TryGetValue(cookieName, out cookieValue))
            {
                cookieValue = defaultValue;
                Response.Cookies.Append(cookieName, cookieValue, new CookieOptions()
                {
                    IsEssential = true,
                    MaxAge = TimeSpan.FromDays(1),
                    HttpOnly = true
                });
            }

            return cookieValue;
        }

        public async Task<string> ClassifyImages(IEnumerable<IFormFile> imageFiles)
        {
            using (var client = new HttpClient())
            {
                using (var formData = new MultipartFormDataContent())
                {
                    foreach (var file in imageFiles)
                    {
                        formData.Add(new StreamContent(file.OpenReadStream()));
                    }
                    var response = await client.PostAsync(URL + @"/classify_multiple", formData);
                    return await response.Content.ReadAsStringAsync();
                }
            }
        }
    }
}
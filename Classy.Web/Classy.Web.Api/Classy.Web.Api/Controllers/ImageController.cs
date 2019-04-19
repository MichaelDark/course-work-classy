using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Classy.Web.NewApi.Controllers
{
    [Route("")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        public const string CLASSIFIER_URL = "https://classy-classifier.herokuapp.com/classifier";
        //public const string URL = @"http://localhost:8000/classifier";

        private readonly ConcurrentDictionary<string, ICollection<IFormFile>> _savedImages;
        private readonly ConcurrentDictionary<string, DateTime> _lastRequestTimes;

        public ImageController(ConcurrentDictionary<string, ICollection<IFormFile>> savedImages,
             ConcurrentDictionary<string, DateTime> lastRequestTimes)
        {
            _savedImages = savedImages;
            _lastRequestTimes = lastRequestTimes;
        }

        [HttpGet("request-id")]
        public IActionResult GetClassyId()
        {
            string id = Guid.NewGuid().ToString();
            UpdateUserLastRequestTime(id);

            return Ok(id);
        }

        [HttpPost("classify-single/{id}")]
        public async Task<IActionResult> PostSingleImage(string id, IFormFile images)
        {
            UpdateUserLastRequestTime(id);
            var uploadedImages = new IFormFile[] { images };
            SaveUserImages(id, uploadedImages);

            return Ok(await ClassifyImages(uploadedImages));
        }

        [HttpPost("classify-multiple/{id}")]
        public async Task<IActionResult> PostMultipleImages(string id, IFormFileCollection images)
        {
            UpdateUserLastRequestTime(id);
            SaveUserImages(id, images);

            return Ok(await ClassifyImages(images));
        }

        [HttpPost("export/{id}")]
        public async Task<IActionResult> ExportZip(string id, [FromBody]IDictionary<string, string> fileClasses)
        {
            // TODO - get files by userId from cookies
            // TODO - get user OS to select either / or \ as file path separator
            var userImages = _savedImages[id]; 
            var files = new Dictionary<string, IFormFile>();
            foreach (var image in userImages) // for quick search
            {
                files[image.FileName] = image;
            }
            using (MemoryStream zipStream = new MemoryStream())
            {
                ZipArchive archive = new ZipArchive(zipStream, ZipArchiveMode.Create, leaveOpen: true);
                foreach (var kv in fileClasses)
                {
                    string fileName = kv.Key;
                    string className = kv.Value;

                    var file = files[fileName];

                    //if (!archive.Entries.Contains())
                    //{
                    //var classDirEntry = archive.CreateEntry(className);
                    var fileEntry = archive.CreateEntry(className + "/" + fileName, CompressionLevel.NoCompression);

                    using (var entryStream = fileEntry.Open())
                    {
                        await file.CopyToAsync(entryStream);
                    }
                    //if (!archive.Entries.Contains(classDirEntry))
                    //{

                    //}
                }
                zipStream.Position = 0;  // TODO: check if needed
                return File(zipStream, "application/octet-stream", "classified_images.zip");
            }

        }

        private void UpdateUserLastRequestTime(string userId)
        {
            _lastRequestTimes[userId] = DateTime.Now;
        }

        private void SaveUserImages(string userId, IEnumerable<IFormFile> images)
        {
            var userFiles = _savedImages.GetOrAdd(userId, new List<IFormFile>());
            foreach (var imageFile in images)
            {
                userFiles.Add(imageFile);
            }
        }

        public async Task<string> ClassifyImages(IEnumerable<IFormFile> imageFiles)
        {
            using (var client = new HttpClient())
            {
                using (var formData = new MultipartFormDataContent())
                {
                    foreach (var file in imageFiles)
                    {
                        formData.Add(new StreamContent(file.OpenReadStream()), file.Name, file.FileName);
                    }
                    var response = await client.PostAsync(CLASSIFIER_URL + "/classify_multiple", formData);
                    string result = await response.Content.ReadAsStringAsync();
                    return result;
                }
            }
        }
    }
}
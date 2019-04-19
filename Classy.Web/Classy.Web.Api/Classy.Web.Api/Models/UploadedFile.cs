using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Classy.Web.Api.Models
{
    public class UploadedFile
    {
        public string Name { get; set; }
        public Stream Content { get; set; }

        public static UploadedFile FromStream(string fileName, Stream stream)
        {
            var file = new UploadedFile();
            file.Name = fileName;
            file.Content = new MemoryStream();
            stream.CopyTo(file.Content);

            return file;
        }
    }
}
